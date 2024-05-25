import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";

import { CircularProgress } from "@mui/material";
import axios from "axios";
import * as XLSX from "xlsx";

interface WebsiteData {
  mainPageUrl: string;
  foundEmailsUrls: { url: string; emails: string[] }[];
}

function BulkEmail() {
  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const isValidUrl = (value: string): boolean => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))" + // domain name and extension
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i" // fragment locator
    );
    return !!urlPattern.test(value);
  };

  const [websites, setWebsites] = useState<string[]>([]);
  const [responseWebsites, setResponseWebsites] = useState<WebsiteData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    setResponseWebsites([]);
    setError(null);

    try {
      const response = await axios.post<{ websites: WebsiteData[] }>(
        "/api/emailExtraction",
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
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(responseWebsites);
  }, [responseWebsites]);

  return (
    <>
      <Head>
        <title>Email Finder | Home</title>
      </Head>
      <div
        className="min-h-screen flex flex-col"
        style={{ marginTop: "-100px" }}
      >
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-28 flex flex-col items-center">
          <div
            className="text-center w-full"
            style={{
              marginTop: "89px",
            }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-6xl">
              Find Emails
            </h1>
            <span className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              in One Click. 10X Your Sales!{" "}
            </span>
            {/* <p className="mt-6 text-lg leading-8 text-gray-600 p-4">
              Find emails, linkedIn of your ideal client website and close them
              for more sales and revenue.
            </p> */}
          </div>
        </div>
        <div className="" style={{ marginTop: "-90px" }}>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            id="fileInput"
            className="hidden"
          />
          <div className="p-4 flex justify-evenly"></div>
          <div
            // className="bg-gradient-to-t from-purple-500/10 to-indigo-500/10 rounded px-8 pt-6 pb-8 mb-4"
            style={{ maxWidth: "70%", margin: "0 auto" }}
          >
            <div
              className="bg-indigo-300/30 rounded-lg p-8 text-center"
              style={{ height: "170px" }}
            >
              <h5 className="mb-4">Upload or drop a file here</h5>
              <label htmlFor="fileInput" className="cursor-pointer">
                <button
                  type="button"
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleUploadButtonClick}
                >
                  {loading ? (
                    <CircularProgress size={20} color="primary" />
                  ) : (
                    "Upload"
                  )}
                </button>
              </label>
              <p className="text-sm text-black mt-4">
                Bulk website extraction supports .XLS, CSV and TXT file formats.
              </p>
            </div>
            {loading && (
              <div className="flex justify-center items-center h-20">
                <CircularProgress color="primary" />
              </div>
            )}
            {responseWebsites.map((websiteData, index) => (
              <div
                key={index}
                className="mb-8 bg-gradient-to-t from-indigo-500/30 to-indigo-500/20 border border-black-500 rounded-lg shadow-md p-4 mt-8"
              >
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Main Page URL: {websiteData.mainPageUrl}
                </h2>
                {websiteData.foundEmailsUrls.map(
                  (foundEmailsUrl, foundEmailsUrlIndex) => (
                    <div key={foundEmailsUrlIndex} className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {/* Found on: {foundEmailsUrl.url} */}
                      </h3>
                      {foundEmailsUrl.emails.map((email, emailIndex) => (
                        <div
                          key={emailIndex}
                          className="bg-indigo-500/20 border border-black-500 rounded-lg shadow-md p-4 mb-4 flex flex-col items-center justify-between"
                        >
                          <p className="text-indigo-600 ">
                            {email.includes("mailto:")
                              ? email.split("mailto:")[1].split("?")[0]
                              : email}
                          </p>
                          <span className="text-gray-500">
                            {/* (Found on: {foundEmailsUrl.url}) */}
                          </span>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BulkEmail;
