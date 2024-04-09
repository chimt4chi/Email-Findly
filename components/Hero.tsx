import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Tab, Tabs, CircularProgress } from "@mui/material";
import Typewriter from "typewriter-effect";

interface WebsiteData {
  mainPageUrl: string;
  foundEmailsUrls: { url: string; emails: string[] }[];
}

function Hero() {
  const [urlInput, setUrlInput] = useState<string>("");
  const [suggestedExtensions, setSuggestedExtensions] = useState<string[]>([]);
  const [domainExtension, setDomainExtension] = useState<string>("");
  const [responseData, setResponseData] = useState<WebsiteData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState<number>(0);

  const [selectedTab, setSelectedTab] = useState<number>(0); // State for selected tab index
  const updateIsShow = (event: React.ChangeEvent<{}>, value: number) => {
    setSelectedTab(value); // Update selected tab index
  };

  useEffect(() => {
    console.log("responseData:", responseData);
  }, [responseData]);

  useEffect(() => {
    const storedRequestCount = localStorage.getItem("requestCount");
    if (storedRequestCount) {
      setRequestCount(Number(storedRequestCount));
    }
  }, []);

  const suggestDomainExtension = useCallback(async () => {
    if (!urlInput.trim()) return;

    const suggestedExtensions = [".com", ".in", ".ac.in", ".org"]; // Add more extensions as needed
    setSuggestedExtensions(suggestedExtensions);
  }, [urlInput]);

  const handleExtensionClick = (extension: string) => {
    setDomainExtension(extension);
    setSuggestedExtensions([]);
  };

  const sendData = useCallback(async () => {
    if (!urlInput.trim() && !domainExtension) return;
    setLoading(true);
    try {
      if (requestCount >= 2) {
        setError(
          "You have reached the request limit. Please login or register to continue."
        );
        return;
      }

      // Preprocess URL input to include 'http://' if it's missing
      const processedUrlInput =
        urlInput.trim().startsWith("http://") ||
        urlInput.trim().startsWith("https://")
          ? urlInput.trim()
          : `http://${urlInput.trim()}`;

      const response = await axios.post<{ websites: WebsiteData[] }>(
        "/api/apiData",
        {
          startingUrls: [`${processedUrlInput}${domainExtension}`], // Pass an array directly
          // startingUrls: ["http://dtu.ac.in", "http://aryabhattacollege.ac.in"], // Pass an array directly
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Send Req ----> ${response}`);

      setResponseData(response.data.websites);
      setError(null);
      setRequestCount((prevCount) => {
        const newCount = prevCount + 1;
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("requestCount", String(newCount));
        }
        return newCount;
      });
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [urlInput, domainExtension, requestCount]);

  return (
    <div>
      <Head>
        <title>Email Finder | Home</title>
      </Head>
      <div className="h-full text-black">
        <div className="flex flex-col items-center justify-center">
          <div className="mt-10 sm:mt-20 text-center">
            <h1 className="text-4xl sm:text-6xl">Email Finder</h1>
            <h3 className="text-4xl sm:text-6xl text-purple-800">
              Find the verified email address
            </h3>
            <h3 className="text-4xl sm:text-6xl">
              <Typewriter
                options={{
                  strings: "of any professional",
                  autoStart: true,
                  loop: true,
                }}
              />
            </h3>
          </div>

          <div className="mt-10 sm:mt-20 w-full max-w-md">
            <Tabs
              value={selectedTab}
              onChange={updateIsShow}
              centered
              textColor="secondary"
            >
              <Tab label="Email by URL" style={{ fontWeight: "bold" }} />
              <Tab label="Website url" style={{ fontWeight: "bold" }} />
            </Tabs>
            <div className="mt-5 px-4 flex justify-center items-start w-full max-w-md">
              <div className="flex flex-col w-full">
                <div className="flex">
                  <input
                    type="text"
                    onChange={(e) => setUrlInput(e.target.value)}
                    value={urlInput}
                    onBlur={suggestDomainExtension}
                    className="form-input py-2 px-4 rounded-l-lg border border-gray-300 w-full"
                    placeholder={"Enter URL (e.g. example.com)"}
                  />
                  <select
                    className="form-select py-2 px-4 rounded-r-lg border border-l-0 border-gray-300 bg-white mr-2"
                    onChange={(e) => setDomainExtension(e.target.value)}
                    value={domainExtension}
                  >
                    <option value="">Select</option>
                    {suggestedExtensions.map((extension, index) => (
                      <option key={index} value={extension}>
                        {extension}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={sendData}
                    disabled={loading || requestCount >= 2}
                    type="button"
                    className="py-2 px-4 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold"
                  >
                    {loading ? (
                      <CircularProgress size={20} color="primary" />
                    ) : (
                      "Find"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 max-w-full">
            {requestCount >= 2 && (
              <p className="text-red-500 text-sm text-center">
                Free request limit reached. Please login or register to
                continue.
              </p>
            )}
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                {responseData.map((websiteData, index) => (
                  <div
                    key={index}
                    className="mb-8 bg-gradient-to-t from-purple-500/30 to-pink-500/20 border border-black-500 rounded-lg shadow-md p-4 mt-8"
                  >
                    <h2 className="text-2xl font-bold mb-4">
                      {/* Main Page URL: {websiteData.mainPageUrl} */}
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
                              className="bg-pink-500/20 border border-black-500 rounded-lg shadow-md p-4 mb-4 flex flex-col items-center justify-between"
                            >
                              <p className="text-purple-800 ">
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
              </>
            )}
          </div>

          <div className="m-20 text-center">Trusted by leading companies</div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
