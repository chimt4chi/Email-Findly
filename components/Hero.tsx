import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Tab, Tabs } from "@mui/material";
import Typewriter from "typewriter-effect";

interface WebsiteData {
  mainPageUrl: string;
  foundEmailsUrls: { url: string; emails: string[] }[];
}

function Hero() {
  const [startingUrls, setStartingUrls] = useState("");
  const [responseData, setResponseData] = useState<WebsiteData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedTab, setSelectedTab] = useState(0); // State for selected tab index
  const updateIsShow = (event: React.ChangeEvent<{}>, value: number) => {
    setSelectedTab(value); // Update selected tab index
  };

  useEffect(() => {
    console.log("responseData:", responseData);
  }, [responseData]);

  const sendData = useCallback(async () => {
    if (!startingUrls.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post<{ websites: WebsiteData[] }>(
        "/api/apiData",
        {
          startingUrls: startingUrls.trim().split("\n"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponseData(response.data.websites);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [startingUrls]);

  return (
    <div>
      <Head>
        <title>Email Finder | Home</title>
      </Head>
      <div className="h-screen text-black">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="grad-circle"></div>

          <div className="mt-10 sm:mt-20 text-center">
            <h1 className="text-4xl sm:text-6xl">Email Finder</h1>
            <h3 className="text-4xl sm:text-6xl text-purple-800">
              Find the verified email address{" "}
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
          {/* <div className="mt-10 sm:mt-20 w-full max-w-md"></div> */}
          <div className="mt-10 sm:mt-20 w-full max-w-md">
            <Tabs
              value={selectedTab} // Set selected tab index
              onChange={updateIsShow}
              centered
              textColor="secondary"
            >
              <Tab label="Email by URL" style={{ fontWeight: "bold" }} />
              {/* <Tab label="Email verifier" style={{ fontWeight: "bold" }} /> */}
              <Tab label="Website url" style={{ fontWeight: "bold" }} />
            </Tabs>
            <div className="mt-5 flex flex-col sm:flex-row justify-center items-center w-full max-w-md">
              <input
                type="text"
                onChange={(e) => setStartingUrls(e.target.value)}
                value={startingUrls}
                className="form-input mt-4 sm:mt-0 mb-4 sm:mb-0 mr-0 sm:mr-2 py-2 px-4 rounded-lg border border-gray-300 w-full"
                placeholder={"Enter URL"}
              />
              <button
                onClick={sendData}
                disabled={loading}
                type="submit"
                className="py-2 px-4 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto mt-5 max-w-full">
            {!loading && responseData.length > 0 && (
              <div className="text-center">
                {responseData.map((websiteData, index) => (
                  <div key={index}>
                    <h2>Main Page URL: {websiteData.mainPageUrl}</h2>
                    <ul>
                      {websiteData.foundEmailsUrls.map(
                        (foundEmailsUrl, foundEmailsUrlIndex) => (
                          <div key={foundEmailsUrlIndex}>
                            <h3>Found on: {foundEmailsUrl.url}</h3>
                            <ul>
                              {foundEmailsUrl.emails.map(
                                (email, emailIndex) => (
                                  <li key={emailIndex}>{email}</li>
                                )
                              )}
                            </ul>
                          </div>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div className="mt-10 text-center">Trusted by leading companies</div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
