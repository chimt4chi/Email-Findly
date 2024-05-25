import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import ClearIcon from "@mui/icons-material/Clear";
import { Skeleton } from "@/components/ui/skeleton";

import Link from "next/link";
import { MdCheckCircle, MdOutlineContentCopy } from "react-icons/md";

interface FoundEmails {
  url: string;
  emails: string[];
  error?: string; // Add error field to FoundEmails interface
}

interface WebsiteData {
  mainPageUrl: string;
  foundEmailsUrls: FoundEmails[];
  error?: string; // Add error field to WebsiteData interface
}

interface LinkedInData {
  requestedUrl: string;
  linkedinUrls: string[];
  error?: string;
}

function LinkedinFinder() {
  const [linkedinInput, setLinkedinInput] = useState<string>("");
  const [responseData, setResponseData] = useState<WebsiteData[]>([]);
  const [linkedinResponseData, setLinkedinResponseData] = useState<
    LinkedInData[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState<number>(0);

  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (emailToCopy: string) => {
    navigator.clipboard.writeText(emailToCopy);
    setCopiedEmail(emailToCopy);
    // Remove the animation class after 2 seconds
    setTimeout(() => setCopiedEmail(null), 800); // Change the timeout to 3000 milliseconds (1 seconds)
  };

  useEffect(() => {
    console.log("responseData:", responseData);
    console.log("responseData:", linkedinResponseData);
  }, [responseData, linkedinResponseData]);

  useEffect(() => {
    const storedRequestCount = localStorage.getItem("requestCount");
    if (storedRequestCount) {
      setRequestCount(Number(storedRequestCount));
    }
  }, []);

  const sendLinkedinData = useCallback(
    async (inputText: string) => {
      if (!inputText.trim()) return;
      setLoading(true);
      setResponseData([]);
      setLinkedinResponseData([]); // Clear previous result
      setError("");
      try {
        const processedUrlInput =
          inputText.trim().startsWith("http://") ||
          inputText.trim().startsWith("https://")
            ? inputText.trim()
            : `http://${inputText.trim()}`;

        const response = await axios.post<LinkedInData>(
          "/api/linkedinExtraction",
          {
            url: processedUrlInput, // Pass the processed URL input
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.linkedinUrls.length === 0) {
          setError("Unable to find. Please check the website url.");
        } else {
          // Map LinkedInData to WebsiteData
          const websiteData: LinkedInData = {
            requestedUrl: response.data.requestedUrl, // Assuming url is the main page URL
            linkedinUrls: response.data.linkedinUrls, // You need to define FoundEmails interface and set appropriate value here
          };
          setLinkedinResponseData([websiteData]);
          setError(null);
        }
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [requestCount]
  );

  const handleLinkedinKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      sendLinkedinData(linkedinInput);
    }
  };

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Email Finder | Home</title>
      </Head>
      <div className="min-h-screen">
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
        <div className="mx-auto max-w-2xl py-20 sm:py-14 flex flex-col items-center">
          <div className="text-center w-full">
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
            <div className="mt-3  p-4">
              <div>
                <div className="relative flex flex-col">
                  <input
                    type="text"
                    onKeyDown={handleLinkedinKeyDown}
                    disabled={loading || requestCount >= 100}
                    onChange={(e) => {
                      setLinkedinInput(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (e.target.value.trim() === "") {
                        setLinkedinInput("");
                      }
                    }}
                    value={linkedinInput}
                    className="form-input py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter URL (e.g. http://example.com)"
                  />
                  {linkedinInput && (
                    <button
                      onClick={() => setLinkedinInput("")}
                      className="absolute right-2 top-5 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                    >
                      <ClearIcon className="h-6 w-6 text-gray-500" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      sendLinkedinData(linkedinInput);
                    }}
                    disabled={loading || requestCount >= 100}
                    type="button"
                    className="rounded-md bg-indigo-600 text-sm font-semibold py-2 px-4 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
                  >
                    Find
                  </button>
                </div>
              </div>

              {/* <div className="relative">
                {showSuggestions && (
                  <div className="absolute top-full left-0 bg-white w-full border border-gray-300 rounded-lg z-10">
                    {suggestedTexts.map((text, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setEmailInput(text);
                          setShowSuggestions(false);
                          sendData(text);
                        }}
                        style={{ minWidth: "calc(100% - 8px)" }}
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                )}
              </div> */}
            </div>
            <main>
              <div className="mt-5 max-w-full">
                {requestCount >= 100 && (
                  <p className="text-red-500 text-sm text-center">
                    Free request limit reached. Please{" "}
                    <span
                      className="cursor-pointer hover:underline hover:underline-offset-8 text-purple-800"
                      onClick={() => router.push("auth?variant=login")}
                    >
                      Login
                    </span>{" "}
                    or{" "}
                    <span
                      className="cursor-pointer hover:underline hover:underline-offset-8 text-purple-800"
                      onClick={() => router.push("auth?variant=register")}
                    >
                      Register
                    </span>{" "}
                    to continue.
                  </p>
                )}

                {loading && (
                  <div className="w-full mx-2 p-8 -mt-10">
                    <div className="mt-20 bg-[#efeeee] rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
                      <Skeleton className="bg-gray-400 h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="bg-gray-400 h-6 w-[250px]" />
                        {/* <Skeleton className="h-4 w-[250px]" /> */}
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="bg-gray-400 h-4 w-4 rounded-full" />
                        <Skeleton className="bg-gray-400 h-4 w-4 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}

                {error ? (
                  <p className="text-indigo-600">{error}</p>
                ) : (
                  <>
                    {linkedinResponseData.map((websiteData, index) => (
                      <div key={index} className="mb-8  p-4 mt-8">
                        <h2 className="text-2xl font-bold mb-4">
                          {websiteData.error}
                        </h2>
                        {linkedinResponseData.map((websiteData, index) => (
                          <div key={index}>
                            <div className="mb-4">
                              <h3 className="text-xl font-semibold mb-2">
                                {websiteData.error}
                              </h3>
                              <div className="flex flex-wrap">
                                <div className="w-full p-2">
                                  <div className="bg-[#efeeee] rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="h-12 w-12 flex items-center justify-center  mb-4 md:mb-0">
                                      <img
                                        src={`https://www.google.com/s2/favicons?domain=${websiteData.requestedUrl}&sz=128`}
                                        alt=""
                                        className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                                      />
                                    </div>
                                    <div className="flex gap-2 flex-col items-start">
                                      <p className="text-indigo-600 hover:text-violet-600  flex items-center gap-2">
                                        <Link
                                          href={`${websiteData.linkedinUrls}`}
                                          target="_blank"
                                        >
                                          {`${websiteData.linkedinUrls}`}
                                        </Link>
                                        {copiedEmail ? (
                                          <div className="cursor-pointer text-green-500 flex items-center gap-1">
                                            <MdCheckCircle
                                              aria-placeholder="Copy Url"
                                              size={16}
                                              onClick={() =>
                                                setCopiedEmail(null)
                                              }
                                            />
                                            <span>copied</span>
                                          </div>
                                        ) : (
                                          <MdOutlineContentCopy
                                            className="cursor-pointer text-black hover:text-indigo-600"
                                            size={16}
                                            onClick={() =>
                                              copyToClipboard(`${websiteData}`)
                                            }
                                          />
                                        )}
                                      </p>
                                    </div>
                                    <div className="flex gap-2 items-center"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </main>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LinkedinFinder;
