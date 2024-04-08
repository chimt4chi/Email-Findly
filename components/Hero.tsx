// import React, { useCallback, useEffect, useState } from "react";
// import Head from "next/head";
// import axios from "axios";
// import { Tab, Tabs } from "@mui/material";
// import Typewriter from "typewriter-effect";

// interface WebsiteData {
//   mainPageUrl: string;
//   foundEmailsUrls: { url: string; emails: string[] }[];
// }

// function Hero() {
//   const [startingUrls, setStartingUrls] = useState("");
//   const [responseData, setResponseData] = useState<WebsiteData[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [selectedTab, setSelectedTab] = useState(0); // State for selected tab index
//   const updateIsShow = (event: React.ChangeEvent<{}>, value: number) => {
//     setSelectedTab(value); // Update selected tab index
//   };

//   useEffect(() => {
//     console.log("responseData:", responseData);
//   }, [responseData]);

//   const sendData = useCallback(async () => {
//     if (!startingUrls.trim()) return;
//     setLoading(true);
//     try {
//       const response = await axios.post<{ websites: WebsiteData[] }>(
//         "/api/apiData",
//         {
//           startingUrls: startingUrls.trim().split("\n"),
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setResponseData(response.data.websites);
//       setError(null);
//     } catch (error) {
//       console.error("Error:", error);
//       setError("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [startingUrls]);

//   return (
//     <div>
//       <Head>
//         <title>Email Finder | Home</title>
//       </Head>
//       <div className="text-black">
//         <div className="flex flex-col items-center justify-center h-full">
//           <div className="grad-circle"></div>

//           <div className="mt-10 sm:mt-20 text-center">
//             <h1 className="text-4xl sm:text-6xl">Email Finder</h1>
//             <h3 className="text-4xl sm:text-6xl text-purple-800">
//               Find the verified email address{" "}
//             </h3>
//             <h3 className="text-4xl sm:text-6xl">
//               <Typewriter
//                 options={{
//                   strings: "of any professional",
//                   autoStart: true,
//                   loop: true,
//                 }}
//               />
//             </h3>
//           </div>
//           {/* <div className="mt-10 sm:mt-20 w-full max-w-md"></div> */}
//           <div className="mt-10 sm:mt-20 w-full max-w-md">
//             <Tabs
//               value={selectedTab} // Set selected tab index
//               onChange={updateIsShow}
//               centered
//               textColor="secondary"
//             >
//               <Tab label="Email by URL" style={{ fontWeight: "bold" }} />
//               {/* <Tab label="Email verifier" style={{ fontWeight: "bold" }} /> */}
//               <Tab label="Website url" style={{ fontWeight: "bold" }} />
//             </Tabs>
//             <div className="mt-5 flex flex-col sm:flex-row justify-center items-center w-full max-w-md">
//               <input
//                 type="text"
//                 onChange={(e) => setStartingUrls(e.target.value)}
//                 value={startingUrls}
//                 className="form-input mt-4 sm:mt-0 mb-4 sm:mb-0 mr-0 sm:mr-2 py-2 px-4 rounded-lg border border-gray-300 w-full"
//                 placeholder={"Enter URL"}
//               />
//               <button
//                 onClick={sendData}
//                 disabled={loading}
//                 type="submit"
//                 className="py-2 px-4 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold"
//               >
//                 {loading ? "Finding..." : "Find"}
//               </button>
//             </div>
//           </div>

//           <div className="overflow-x-auto mt-5 max-w-full">
//             {!loading && responseData.length > 0 && (
//               <div className="text-center">
//                 {responseData.map((websiteData, index) => (
//                   <div key={index} className="mb-8">
//                     <h2 className="text-2xl font-bold mb-4">
//                       Main Page URL: {websiteData.mainPageUrl}
//                     </h2>
//                     {websiteData.foundEmailsUrls.map(
//                       (foundEmailsUrl, foundEmailsUrlIndex) => (
//                         <div key={foundEmailsUrlIndex} className="mb-4">
//                           <h3 className="text-lg font-semibold mb-2">
//                             Found on: {foundEmailsUrl.url}
//                           </h3>
//                           {foundEmailsUrl.emails.map((email, emailIndex) => (
//                             <div
//                               key={emailIndex}
//                               className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col items-center justify-between"
//                             >
//                               <p className="text-blue-500 ">{email}</p>
//                               <span className="text-gray-500">
//                                 (Found on: {foundEmailsUrl.url})
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       )
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//             {error && <p className="text-red-500">{error}</p>}
//           </div>

//           <div className="mt-10 text-center">Trusted by leading companies</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero;

// import React, { useCallback, useEffect, useState } from "react";
// import Head from "next/head";
// import axios from "axios";
// import { Tab, Tabs, CircularProgress } from "@mui/material";
// import Typewriter from "typewriter-effect";

// interface WebsiteData {
//   mainPageUrl: string;
//   foundEmailsUrls: { url: string; emails: string[] }[];
// }

// function Hero() {
//   const [startingUrls, setStartingUrls] = useState("");
//   const [responseData, setResponseData] = useState<WebsiteData[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [selectedTab, setSelectedTab] = useState(0); // State for selected tab index
//   const updateIsShow = (event: React.ChangeEvent<{}>, value: number) => {
//     setSelectedTab(value); // Update selected tab index
//   };

//   useEffect(() => {
//     console.log("responseData:", responseData);
//   }, [responseData]);

//   const sendData = useCallback(async () => {
//     if (!startingUrls.trim()) return;
//     setLoading(true);
//     try {
//       // Preprocess startingUrls to include 'http://' if it's missing
//       const processedStartingUrls =
//         startingUrls.trim().startsWith("http://") ||
//         startingUrls.trim().startsWith("https://")
//           ? startingUrls.trim()
//           : `http://${startingUrls.trim()}`;

//       const response = await axios.post<{ websites: WebsiteData[] }>(
//         "/api/apiData",
//         {
//           startingUrls: processedStartingUrls.split("\n"),
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setResponseData(response.data.websites);
//       setError(null);
//     } catch (error) {
//       console.error("Error:", error);
//       setError("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [startingUrls]);

//   return (
//     <div>
//       <Head>
//         <title>Email Finder | Home</title>
//       </Head>
//       <div className="h-full text-black">
//         <div className="flex flex-col items-center justify-center ">
//           {/* <div className="grad-circle"></div> */}

//           <div className="mt-10 sm:mt-20 text-center">
//             <h1 className="text-4xl sm:text-6xl">Email Finder</h1>
//             <h3 className="text-4xl sm:text-6xl text-purple-800">
//               Find the verified email address{" "}
//             </h3>
//             <h3 className="text-4xl sm:text-6xl">
//               <Typewriter
//                 options={{
//                   strings: "of any professional",
//                   autoStart: true,
//                   loop: true,
//                 }}
//               />
//             </h3>
//           </div>

//           <div className="mt-10 sm:mt-20 w-full max-w-md">
//             <Tabs
//               value={selectedTab} // Set selected tab index
//               onChange={updateIsShow}
//               centered
//               textColor="secondary"
//             >
//               <Tab label="Email by URL" style={{ fontWeight: "bold" }} />
//               {/* <Tab label="Email verifier" style={{ fontWeight: "bold" }} /> */}
//               <Tab label="Website url" style={{ fontWeight: "bold" }} />
//             </Tabs>
//             <div className="mt-5 px-4 flex flex-col sm:flex-row justify-center items-center w-full max-w-md">
//               <input
//                 type="text"
//                 onChange={(e) => setStartingUrls(e.target.value)}
//                 value={startingUrls}
//                 className="form-input mt-4 sm:mt-0 mb-4 sm:mb-0 mr-0 sm:mr-2 py-2 px-4 rounded-lg border border-gray-300 w-full"
//                 placeholder={"Enter URL (e.g. example.com)"}
//               />
//               <button
//                 onClick={sendData}
//                 disabled={loading}
//                 type="submit"
//                 className="py-2 px-4 rounded-lg bg-gradient-to-br sm:w-auto w-full from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold"
//               >
//                 {loading ? (
//                   <CircularProgress size={20} color="primary" />
//                 ) : (
//                   "Find"
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="mt-5 max-w-full">
//             {loading ? ( // Render loader if loading is true
//               <div className="flex justify-center items-center">
//                 <CircularProgress color="secondary" />
//               </div>
//             ) : (
//               <>
//                 {responseData.map((websiteData, index) => (
//                   <div
//                     key={index}
//                     className="mb-8 bg-gradient-to-t from-purple-500/30 to-pink-500/20 border border-black-500 rounded-lg shadow-md p-4 mt-8"
//                   >
//                     <h2 className="text-2xl font-bold mb-4">
//                       Main Page URL: {websiteData.mainPageUrl}
//                     </h2>
//                     {websiteData.foundEmailsUrls.map(
//                       (foundEmailsUrl, foundEmailsUrlIndex) => (
//                         <div key={foundEmailsUrlIndex} className="mb-4">
//                           <h3 className="text-lg font-semibold mb-2">
//                             Found on: {foundEmailsUrl.url}
//                           </h3>
//                           {foundEmailsUrl.emails.map((email, emailIndex) => (
//                             <div
//                               key={emailIndex}
//                               className="bg-pink-500/20 border border-black-500 rounded-lg shadow-md p-4 mb-4 flex flex-col items-center justify-between"
//                             >
//                               <p className="text-purple-800 ">{email}</p>
//                               <span className="text-gray-500">
//                                 (Found on: {foundEmailsUrl.url})
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       )
//                     )}
//                   </div>
//                 ))}
//                 {error && <p className="text-red-500">{error}</p>}
//               </>
//             )}
//           </div>

//           <div className="m-20 text-center">Trusted by leading companies</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero;

// Updated Code 07/04/2024

// import React, { useCallback, useEffect, useState } from "react";
// import Head from "next/head";
// import axios from "axios";
// import { Tab, Tabs, CircularProgress } from "@mui/material";
// import Typewriter from "typewriter-effect";

// interface WebsiteData {
//   mainPageUrl: string;
//   foundEmailsUrls: { url: string; emails: string[] }[];
// }

// const loadingMessages = [
//   "Finding...",
//   "Searching for emails...",
//   "Discovering contacts...",
//   "Scanning websites...",
// ];

// function Hero() {
//   const [urlInput, setUrlInput] = useState<string>("");
//   const [domainExtension, setDomainExtension] = useState<string>(".com");
//   const [responseData, setResponseData] = useState<WebsiteData[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [requestCount, setRequestCount] = useState<number>(0);
//   const [loadingMessage, setLoadingMessage] = useState<string>("");

//   const [selectedTab, setSelectedTab] = useState<number>(0); // State for selected tab index
//   const updateIsShow = (event: React.ChangeEvent<{}>, value: number) => {
//     setSelectedTab(value); // Update selected tab index
//   };

//   // Load request count from localStorage on component mount
//   useEffect(() => {
//     const savedCount = localStorage.getItem("requestCount");
//     if (savedCount) {
//       setRequestCount(parseInt(savedCount, 10));
//     }
//   }, []);

//   // Save request count to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("requestCount", requestCount.toString());
//   }, [requestCount]);

//   const sendData = useCallback(async () => {
//     if (!urlInput.trim()) return;
//     setLoading(true);
//     const randomIndex = Math.floor(Math.random() * loadingMessages.length);
//     setLoadingMessage(loadingMessages[randomIndex]);
//     try {
//       if (requestCount >= 2) {
//         setError(
//           "You have reached the request limit. Please subscribe to continue."
//         );
//         return;
//       }

//       // Preprocess URL input to include 'http://' if it's missing
//       const processedUrlInput =
//         urlInput.trim().startsWith("http://") ||
//         urlInput.trim().startsWith("https://")
//           ? urlInput.trim()
//           : `http://${urlInput.trim()}`;

//       const response = await axios.post<{ websites: WebsiteData[] }>(
//         "/api/apiData",
//         {
//           startingUrls: [`${processedUrlInput}${domainExtension}`],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setResponseData(response.data.websites);
//       setError(null);
//       setRequestCount((prevCount) => prevCount + 1);
//     } catch (error) {
//       console.error("Error:", error);
//       setError("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [urlInput, domainExtension, requestCount]);

//   return (
//     <div>
//       <Head>
//         <title>Email Finder | Home</title>
//       </Head>
//       <div className="h-full text-black">
//         <div className="flex flex-col items-center justify-center">
//           <div className="mt-10 sm:mt-20 text-center">
//             <h1 className="text-4xl sm:text-6xl">Email Finder</h1>
//             <h3 className="text-4xl sm:text-6xl text-purple-800">
//               Find the verified email address
//             </h3>
//             <h3 className="text-4xl sm:text-6xl">
//               <Typewriter
//                 options={{
//                   strings: "of any professional",
//                   autoStart: true,
//                   loop: true,
//                 }}
//               />
//             </h3>
//           </div>

//           <div className="mt-10 sm:mt-20 w-full max-w-md">
//             <Tabs
//               value={selectedTab}
//               onChange={updateIsShow}
//               centered
//               textColor="secondary"
//             >
//               <Tab label="Email by URL" style={{ fontWeight: "bold" }} />
//               <Tab label="Website url" style={{ fontWeight: "bold" }} />
//             </Tabs>
//             <div className="mt-5 px-4 flex justify-center items-center w-full max-w-md">
//               <div className="flex">
//                 <input
//                   type="text"
//                   onChange={(e) => setUrlInput(e.target.value)}
//                   value={urlInput}
//                   className="form-input py-2 px-4 rounded-l-lg border border-gray-300 w-full"
//                   placeholder={"Enter URL (e.g. example.com)"}
//                 />
//                 <select
//                   className="form-select py-2 px-4 rounded-r-lg border border-l-0 border-gray-300 bg-white"
//                   onChange={(e) => setDomainExtension(e.target.value)}
//                   value={domainExtension}
//                 >
//                   <option value=".com">.com</option>
//                   <option value=".in">.in</option>
//                   <option value=".ac.in">.ac.in</option>
//                   <option value=".org">.org</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//               <button
//                 onClick={sendData}
//                 disabled={loading}
//                 type="button"
//                 className="py-2 px-4 ml-2 rounded-lg bg-gradient-to-br w-auto from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold"
//               >
//                 Find
//               </button>
//             </div>
//             {loading && (
//               <div className="mt-5 px-4 flex justify-center items-center w-full max-w-md">
//                 <CircularProgress size={20} color="primary" />
//                 <span className="ml-2">{loadingMessage}</span>
//               </div>
//             )}
//           </div>

//           <div className="mt-5 max-w-full">
//             {error ? (
//               <p className="text-red-500">{error}</p>
//             ) : (
//               <>
//                 {responseData.map((websiteData, index) => (
//                   <div
//                     key={index}
//                     className="mb-8 bg-gradient-to-t from-purple-500/30 to-pink-500/20 border border-black-500 rounded-lg shadow-md p-4 mt-8"
//                   >
//                     <h2 className="text-2xl font-bold mb-4">
//                       Main Page URL: {websiteData.mainPageUrl}
//                     </h2>
//                     {websiteData.foundEmailsUrls.map(
//                       (foundEmailsUrl, foundEmailsUrlIndex) => (
//                         <div key={foundEmailsUrlIndex} className="mb-4">
//                           <h3 className="text-lg font-semibold mb-2">
//                             Found on: {foundEmailsUrl.url}
//                           </h3>
//                           {foundEmailsUrl.emails.map((email, emailIndex) => (
//                             <div
//                               key={emailIndex}
//                               className="bg-pink-500/20 border border-black-500 rounded-lg shadow-md p-4 mb-4 flex flex-col items-center justify-between"
//                             >
//                               <p className="text-purple-800 ">
//                                 {email.includes("mailto:")
//                                   ? email.split("mailto:")[1].split("?")[0]
//                                   : email}
//                               </p>
//                               <span className="text-gray-500">
//                                 (Found on: {foundEmailsUrl.url})
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       )
//                     )}
//                   </div>
//                 ))}
//               </>
//             )}
//           </div>

//           <div className="m-20 text-center">Trusted by leading companies</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero;

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
    if (!urlInput.trim() || !domainExtension) return;
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
          startingUrls: [`${processedUrlInput}${domainExtension}`],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
                      Main Page URL: {websiteData.mainPageUrl}
                    </h2>
                    {websiteData.foundEmailsUrls.map(
                      (foundEmailsUrl, foundEmailsUrlIndex) => (
                        <div key={foundEmailsUrlIndex} className="mb-4">
                          <h3 className="text-lg font-semibold mb-2">
                            Found on: {foundEmailsUrl.url}
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
                                (Found on: {foundEmailsUrl.url})
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
