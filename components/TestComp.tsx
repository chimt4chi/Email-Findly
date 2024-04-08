// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// export default function TestComp() {
//   const [emails, setEmails] = useState<string[]>([]);

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = e.target?.result;
//         if (typeof data === "string" || data instanceof ArrayBuffer) {
//           const workbook = XLSX.read(data, { type: "binary" });
//           const sheetName = workbook.SheetNames[0];
//           const sheet = workbook.Sheets[sheetName];
//           const parsedData: any[] = XLSX.utils.sheet_to_json(sheet);

//           const extractedEmails: string[] = [];

//           parsedData.forEach((obj) => {
//             for (const key in obj) {
//               const value = obj[key];
//               if (typeof value === "string" && value.includes("@")) {
//                 extractedEmails.push(value);
//               }
//             }
//           });

//           setEmails(extractedEmails);
//         }
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <div className="h-screen">
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
//       <br />
//       <br />
//       {emails.length > 0 && (
//         <div>
//           <h2>Emails:</h2>
//           <ul>
//             {emails.map((email, index) => (
//               <li key={index}>{email}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import * as XLSX from "xlsx";

export default function TestComp() {
  const [websites, setWebsites] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
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
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const isValidUrl = (url: string) => {
    const pattern = new RegExp(
      /^(?:http|https):\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=%]*$/
    );
    return pattern.test(url);
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  return (
    <div className="h-screen">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        id="fileInput"
        className="hidden"
      />
      <div className="p-4 flex justify-evenly">
        <h5 className="inline-block m-0 text-4xl text-purple-800 font-mono font-bold">
          Bulk Website Extraction
        </h5>
      </div>
      <div
        className="bg-gradient-to-t from-purple-500/10 to-pink-500/10 rounded px-8 pt-6 pb-8 mb-4"
        style={{ maxWidth: "70%", margin: "0 auto" }}
      >
        <p className="text-black text-base mb-4 " style={{ fontSize: "1.1em" }}>
          Extract website URLs in bulk from the uploaded file.
        </p>
        <div
          className="bg-pink-300/30 rounded-lg p-8 text-center"
          style={{ height: "170px" }}
        >
          <h5 className="mb-4">Upload or drop a file here</h5>
          <label htmlFor="fileInput" className="cursor-pointer">
            <button
              type="button"
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUploadButtonClick}
            >
              Upload
            </button>
          </label>
          <p className="text-sm text-black mt-4">
            Bulk website extraction supports .XLS, CSV and TXT file formats.
          </p>
        </div>
      </div>
      {websites.length > 0 && (
        <div className="bg-gray-200 p-4 rounded-lg mt-4">
          <h2 className="text-2xl font-bold mb-2">Extracted Websites:</h2>
          <ul>
            {websites.map((website, index) => (
              <li key={index}>{website}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
