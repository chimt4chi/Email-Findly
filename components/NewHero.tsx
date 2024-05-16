import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { MdCheckCircle, MdOutlineContentCopy } from "react-icons/md";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import useCurrentUser from "@/hooks/useCurrentUser";

interface FoundEmails {
  url: string;
  emails: string[];
  error?: string; // Add error field to FoundEmails interface
  linkedinUrls?: string[];
}

interface WebsiteData {
  mainPageUrl: string;
  foundEmailsUrls: FoundEmails[];
  error?: string; // Add error field to WebsiteData interface
}

function NewHero() {
  const [urlInput, setUrlInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [linkedinInput, setLinkedinInput] = useState<string>("");
  const [suggestedTexts, setSuggestedTexts] = useState<string[]>([]);
  const [domainExtension, setDomainExtension] = useState<string>("");
  const [responseData, setResponseData] = useState<WebsiteData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false); // State for showing/hiding suggestions

  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const [value, setValue] = React.useState("1");

  useEffect(() => {
    const data = responseData.map((link) => link);
    console.log(`DATA -> ${data}`);
  }, [responseData]);

  const sendLinkedinData = useCallback(
    async (inputText: string) => {
      if (!inputText.trim() && !domainExtension) return;
      setLoading(true);
      setResponseData([]); // Clear previous result
      try {
        const processedUrlInput =
          inputText.trim().startsWith("http://") ||
          inputText.trim().startsWith("https://")
            ? inputText.trim()
            : `http://${inputText.trim()}`;

        const response = await axios.post<{ linkedinUrls: WebsiteData[] }>(
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
          setError(
            "Please check the URL, Make sure the website is up an running."
          );
        } else {
          setResponseData(response.data.linkedinUrls);
          setError(null);
          setShowSuggestions(false); // Close suggestions when data is fetched
        }
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [domainExtension, requestCount]
  );

  const copyToClipboard = (emailToCopy: string) => {
    navigator.clipboard.writeText(emailToCopy);
    setCopiedEmail(emailToCopy);
    // Remove the animation class after 2 seconds
    setTimeout(() => setCopiedEmail(null), 800); // Change the timeout to 3000 milliseconds (1 seconds)
  };

  const { data: user } = useCurrentUser();

  return (
    <>
      <div className="flex flex-col">
        <input
          type="text"
          className="form-input py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
          placeholder="Enter URL"
          onChange={(e) => setLinkedinInput(e.target.value)}
          value={linkedinInput}
        />
        <button
          type="button"
          className="rounded-md bg-indigo-600 text-sm font-semibold py-2 px-4 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
          onClick={() => sendLinkedinData(linkedinInput)}
        >
          Find
        </button>
      </div>

      {/* {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>} */}

      {responseData.map((websiteData, index) => (
        <div key={index} className="mt-4">
          <p>{`${websiteData}`}</p>
          <p>Found Emails:</p>
        </div>
      ))}

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
              <Skeleton className="bg-gray-400 h-4 w-4 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {responseData.map((websiteData, index) => (
            <div key={index} className="mb-8  p-4 mt-8">
              <h2 className="text-2xl font-bold mb-4">{websiteData.error}</h2>
              {responseData.map((websiteData, index) => (
                <div key={index}>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {websiteData.error}
                    </h3>
                    <div className="flex flex-wrap">
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
                              {`${websiteData}`}
                              {copiedEmail ? (
                                <div className="cursor-pointer text-green-500 flex items-center gap-1">
                                  <MdCheckCircle
                                    aria-placeholder="Copy Url"
                                    size={16}
                                    onClick={() => setCopiedEmail(null)}
                                  />
                                  <span>copied</span>
                                </div>
                              ) : (
                                <MdOutlineContentCopy
                                  className="cursor-pointer text-black hover:text-indigo-600"
                                  size={16}
                                  // onClick={copyToClipboard(`${websiteData}`)}
                                />
                              )}
                            </p>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Link
                              href={`mailto:${user?.email}`}
                              target="_blank"
                            >
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
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default NewHero;
