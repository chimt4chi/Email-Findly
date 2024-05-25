import React from "react";
import axios from "axios";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Link from "next/link";
import { MdCheckCircle, MdOutlineContentCopy } from "react-icons/md";
import { Skeleton } from "./ui/skeleton";
import { SiGmail } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import useCurrentUser from "@/hooks/useCurrentUser";

interface WebsiteData {
  mainPageUrl: string;
  foundEmailsUrls: {
    url: string;
    emails: string[];
    linkedinUrls: string[];
    error?: string;
  }[];
  // Add error field to FoundEmails interface
}

function BulkUpload() {
  const isValidUrl = () => {
    // Your URL validation logic goes here
    return true; // Placeholder for demonstration
  };

  const [responseWebsites, setResponseWebsites] = useState<WebsiteData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (emailToCopy: string) => {
    navigator.clipboard.writeText(emailToCopy);
    setCopiedEmail(emailToCopy);
    // Remove the animation class after 2 seconds
    setTimeout(() => setCopiedEmail(null), 3000); // Change the timeout to 3000 milliseconds (3 seconds)
  };

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
          const parsedData: object[] = XLSX.utils.sheet_to_json(sheet);

          const extractedWebsites: string[] = [];

          parsedData.forEach((obj) => {
            for (const key in obj) {
              const value = obj[key];
              if (typeof value === "string" && isValidUrl()) {
                extractedWebsites.push(value);
              }
            }
          });

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

  const { data: user } = useCurrentUser();

  return (
    <div>
      <Head>
        <title>Email Findly | Bulk Upload</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto max-w-2xl py-32 sm:py-10 flex flex-col items-center">
          <div
            className="text-center w-full"
            style={{
              marginTop: "89px",
            }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-6xl">
              Find Emails, LinkedIn
            </h1>
            <span className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              in One Click. 10X Your Sales!{" "}
            </span>
            <p className="mt-6 text-lg leading-8 text-gray-600 p-4">
              Find emails, linkedIn of your ideal client website and close them
              for more sales and revenue.
            </p>
            <div className="mt-10  p-4">
              <div className="relative flex flex-col">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                  id="fileInput"
                  className="form-input py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter URL (e.g. example.com)"
                />
                <button
                  onClick={handleUploadButtonClick}
                  type="button"
                  className="rounded-md bg-indigo-600 text-sm font-semibold py-2 px-4 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
                >
                  Upload
                </button>
              </div>
            </div>
            <main>
              <div className="mt-5 max-w-full">
                {loading && (
                  <div className="w-full mx-2">
                    <div className="mt-20 bg-[#efeeee] rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
                      <Skeleton className="bg-gray-400 h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="bg-gray-400 h-6 w-[250px]" />
                        {/* <Skeleton className="h-4 w-[250px]" /> */}
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="bg-gray-400 h-4 w-4 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}

                {error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <>
                    {responseWebsites.map((websiteData, index) => (
                      <div key={index} className="mb-8  p-4 mt-8">
                        {websiteData.foundEmailsUrls.map(
                          (foundEmailsUrl, foundEmailsUrlIndex) => (
                            <div key={foundEmailsUrlIndex} className="mb-4">
                              <h3 className="text-xl font-semibold mb-2">
                                {foundEmailsUrl.error}
                              </h3>
                              {foundEmailsUrl.emails.map(
                                (email, emailIndex) => (
                                  <div
                                    key={emailIndex}
                                    className="flex flex-wrap "
                                  >
                                    <div className="w-full p-2">
                                      <div className="bg-[#efeeee] rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-300 mb-4 md:mb-0">
                                          <img
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                            alt=""
                                            className="h-8 w-8 md:h-10 md:w-10"
                                          />
                                        </div>
                                        <div className="flex gap-2 flex-col items-start">
                                          <p className="text-indigo-600 flex items-center gap-2">
                                            {email.includes("mailto:")
                                              ? email
                                                  .split("mailto:")[1]
                                                  .split("?")[0]
                                              : email}
                                            {copiedEmail ? (
                                              <MdCheckCircle
                                                aria-placeholder="Copy Url"
                                                className="cursor-pointer text-green-500"
                                                size={16}
                                                onClick={() =>
                                                  setCopiedEmail(null)
                                                }
                                              />
                                            ) : (
                                              <MdOutlineContentCopy
                                                className="cursor-pointer text-black hover:text-indigo-600"
                                                size={16}
                                                onClick={() =>
                                                  copyToClipboard(
                                                    email.includes("mailto:")
                                                      ? email
                                                          .split("mailto:")[1]
                                                          .split("?")[0]
                                                      : email
                                                  )
                                                }
                                              />
                                            )}
                                          </p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                          <Link
                                            href={`${foundEmailsUrl.linkedinUrls}`}
                                            target="_blank"
                                          >
                                            <FaLinkedinIn
                                              size={16}
                                              className="cursor-pointer hover:text-indigo-600"
                                              aria-placeholder="Linkedin Url"
                                            />
                                          </Link>
                                          <Link href={`mailto:${user?.email}`}>
                                            <SiGmail
                                              className="cursor-pointer hover:text-indigo-600"
                                              size={16}
                                              aria-placeholder="Send emails to your gmail"
                                            />
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulkUpload;
