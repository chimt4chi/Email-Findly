import BulkUpload from "@/components/BulkUpload";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";

interface WebsiteData {
  mainPageUrl: string;
  foundEmailsUrls: { url: string; emails: string[] }[];
}

function Category2() {
  const isValidUrl = (url: string) => {
    // Your URL validation logic goes here
    return true; // Placeholder for demonstration
  };

  const [websites, setWebsites] = useState<string[]>([]);
  const [responseWebsites, setResponseWebsites] = useState<WebsiteData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        if (typeof data === "string" || data instanceof ArrayBuffer) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData: any[] = XLSX.utils.sheet_to_json(sheet);

          const extractedWebsites: string[] = [];

          parsedData.forEach((obj) => {
            for (const key in obj) {
              const value = obj[key];
              if (typeof value === "string" && isValidUrl(value)) {
                extractedWebsites.push(value);
              }
            }
          });

          setWebsites(extractedWebsites);
          sendData(extractedWebsites);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const sendData = useCallback(async (extractedWebsites: string[]) => {
    if (!extractedWebsites.length) return;
    setLoading(true);

    try {
      const response = await axios.post<{ websites: WebsiteData[] }>(
        "/api/apiData",
        {
          startingUrls: extractedWebsites,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);

      setResponseWebsites(response.data.websites);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    // <div>
    //   <Head>
    //     <title>Email Findly | Bulk Upload</title>
    //   </Head>
    //   {/* <div className="h-screen">Bulk Upload</div> */}
    //   {/* <TestComp /> */}
    //   <div className="min-h-screen mb-10 flex flex-col items-center justify-center">
    //     <input
    //       type="file"
    //       accept=".xlsx, .xls"
    //       onChange={handleFileUpload}
    //       id="fileInput"
    //       className="hidden"
    //     />
    //     <div className="p-4 flex justify-evenly">
    //       <h5 className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-6xl">
    //         Bulk Website Extraction
    //       </h5>
    //     </div>
    //     <div className="bg-gradient-to-t from-purple-500/10 to-pink-500/10 rounded px-8 pt-6 pb-8 mb-4 w-[70%]">
    //       <p
    //         className="text-black text-base mb-4 "
    //         style={{ fontSize: "1.1em" }}
    //       >
    //         Extract website URLs in bulk from the uploaded file.
    //       </p>
    //       <div
    //         className="bg-pink-300/30 rounded-lg p-8 text-center"
    //         style={{ height: "170px" }}
    //       >
    //         <h5 className="mb-4">Upload or drop a file here</h5>
    //         <label htmlFor="fileInput" className="cursor-pointer">
    //           <button
    //             type="button"
    //             className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
    //             onClick={handleUploadButtonClick}
    //           >
    //             Upload
    //           </button>
    //         </label>
    //         <p className="text-sm text-black mt-4">
    //           Bulk website extraction supports .XLS, CSV and TXT file formats.
    //         </p>
    //       </div>
    //     </div>
    //     <div className="bg-gradient-to-t from-purple-500/10 to-pink-500/10 rounded px-8 pt-6 pb-8 mb-4 w-[70%]">
    //       {loading && (
    //         <div className="flex justify-center items-center h-20">
    //           <CircularProgress color="primary" />
    //         </div>
    //       )}
    //       {responseWebsites.map((websiteData, index) => (
    //         <div
    //           key={index}
    //           className="mb-8 bg-gradient-to-t from-purple-500/30 to-pink-500/20 border border-black-500 rounded-lg shadow-md p-4 mt-8"
    //         >
    //           <h2 className="text-2xl font-bold mb-4 text-center">
    //             Main Page URL: {websiteData.mainPageUrl}
    //           </h2>
    //           {websiteData.foundEmailsUrls.map(
    //             (foundEmailsUrl, foundEmailsUrlIndex) => (
    //               <div key={foundEmailsUrlIndex} className="mb-4">
    //                 <h3 className="text-lg font-semibold mb-2">
    //                   {/* Found on: {foundEmailsUrl.url} */}
    //                 </h3>
    //                 {foundEmailsUrl.emails.map((email, emailIndex) => (
    //                   <div
    //                     key={emailIndex}
    //                     className="bg-pink-500/20 border border-black-500 rounded-lg shadow-md p-4 mb-4 flex flex-col items-center justify-between"
    //                   >
    //                     <p className="text-purple-800 ">
    //                       {email.includes("mailto:")
    //                         ? email.split("mailto:")[1].split("?")[0]
    //                         : email}
    //                     </p>
    //                     <span className="text-gray-500">
    //                       {/* (Found on: {foundEmailsUrl.url}) */}
    //                     </span>
    //                   </div>
    //                 ))}
    //               </div>
    //             )
    //           )}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <>
      <BulkUpload />
    </>
  );
}

export default Category2;
