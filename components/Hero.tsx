// import React, { useCallback, useEffect, useState } from "react";
// import Head from "next/head";
// import axios from "axios";
// import { Tab, Tabs, CircularProgress } from "@mui/material";
// import Typewriter from "typewriter-effect";
// import { useRouter } from "next/router";

// interface WebsiteData {
//   mainPageUrl: string;
//   foundEmailsUrls: { url: string; emails: string[] }[];
// }

// function Hero() {
//   const [urlInput, setUrlInput] = useState<string>("");
//   const [suggestedTexts, setSuggestedTexts] = useState<string[]>([]);
//   const [domainExtension, setDomainExtension] = useState<string>("");
//   const [responseData, setResponseData] = useState<WebsiteData[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [requestCount, setRequestCount] = useState<number>(0);
//   const [showSuggestions, setShowSuggestions] = useState<boolean>(false); // State for showing/hiding suggestions

//   const [selectedTab, setSelectedTab] = useState<number>(0);

//   useEffect(() => {
//     console.log("responseData:", responseData);
//   }, [responseData]);

//   useEffect(() => {
//     const storedRequestCount = localStorage.getItem("requestCount");
//     if (storedRequestCount) {
//       setRequestCount(Number(storedRequestCount));
//     }
//   }, []);

//   const suggestTexts = useCallback(() => {
//     // Predefined list of suggestions
//     const predefinedSuggestions: string[] = [
//       "dtu.ac.in",
//       "aryabhattacollege.ac.in",
//       "google.com",
//     ];
//     // Filter suggestions based on the current input value
//     const filteredSuggestions = predefinedSuggestions.filter((text) =>
//       text.toLowerCase().includes(urlInput.toLowerCase())
//     );
//     // Set the filtered suggestions
//     setSuggestedTexts(filteredSuggestions);
//     // Show suggestions only if there are filtered suggestions
//     setShowSuggestions(filteredSuggestions.length > 0);
//   }, [urlInput]);

//   const sendData = useCallback(
//     async (inputText: string) => {
//       if (!inputText.trim() && !domainExtension) return;
//       setLoading(true);
//       try {
//         if (requestCount >= 2) {
//           setError(
//             "You have reached the request limit. Please login or register to continue."
//           );
//           return;
//         }

//         const processedUrlInput =
//           inputText.trim().startsWith("http://") ||
//           inputText.trim().startsWith("https://")
//             ? inputText.trim()
//             : `http://${inputText.trim()}`;

//         const response = await axios.post<{ websites: WebsiteData[] }>(
//           "/api/apiData",
//           {
//             startingUrls: [`${processedUrlInput}${domainExtension}`],
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log(`Send Req ----> ${response}`);

//         setResponseData(response.data.websites);
//         setError(null);
//         setRequestCount((prevCount) => {
//           const newCount = prevCount + 1;
//           if (typeof localStorage !== "undefined") {
//             localStorage.setItem("requestCount", String(newCount));
//           }
//           return newCount;
//         });
//         setShowSuggestions(false); // Close suggestions when data is fetched
//       } catch (error) {
//         console.error("Error:", error);
//         setError("An error occurred. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [domainExtension, requestCount]
//   );

//   const router = useRouter();

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
//               onChange={(_, value) => setSelectedTab(value)}
//               centered
//               textColor="secondary"
//             >
//               <Tab label="Email by URL" style={{ fontWeight: "bold" }} />
//               <Tab label="Website url" style={{ fontWeight: "bold" }} />
//             </Tabs>
//             <div className="mt-5 px-4 flex justify-center items-start w-full max-w-md relative">
//               <div className="flex flex-col w-full">
//                 <div className="flex relative w-full gap-2">
//                   <input
//                     type="text"
//                     disabled={loading || requestCount >= 2}
//                     onChange={(e) => {
//                       setUrlInput(e.target.value);
//                       if (e.target.value.trim() === "") {
//                         setShowSuggestions(false); // Hide suggestions when input is cleared
//                       } else {
//                         suggestTexts();
//                       }
//                     }}
//                     onBlur={(e) => {
//                       if (e.target.value.trim() === "") {
//                         setUrlInput("");
//                         setShowSuggestions(false); // Hide suggestions when input is cleared
//                       }
//                     }}
//                     value={urlInput}
//                     className="form-input py-2 px-4 rounded-md border border-gray-300 w-full"
//                     placeholder={"Enter URL (e.g. example.com)"}
//                   />
//                   {showSuggestions && (
//                     <div className="absolute top-12 left-0 bg-white w-full border border-gray-300 rounded-lg z-10">
//                       {suggestedTexts.map((text, index) => (
//                         <div
//                           key={index}
//                           className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//                           onClick={() => {
//                             setUrlInput(text);
//                             setShowSuggestions(false);
//                             sendData(text);
//                           }}
//                         >
//                           {text}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   <button
//                     onClick={() => sendData(urlInput)}
//                     disabled={loading || requestCount >= 2}
//                     type="button"
//                     className="py-2 px-4 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold"
//                   >
//                     {loading ? (
//                       <CircularProgress size={20} color="primary" />
//                     ) : (
//                       "Find"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-5 max-w-full">
//             {requestCount >= 2 && (
//               <p className="text-red-500 text-sm text-center">
//                 Free request limit reached. Please{" "}
//                 <span
//                   className="cursor-pointer hover:underline hover:underline-offset-8 text-purple-800"
//                   onClick={() => router.push("auth?variant=login")}
//                 >
//                   Login
//                 </span>{" "}
//                 or{" "}
//                 <span
//                   className="cursor-pointer hover:underline hover:underline-offset-8 text-purple-800"
//                   onClick={() => router.push("auth?variant=register")}
//                 >
//                   Register
//                 </span>{" "}
//                 to continue.
//               </p>
//             )}
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
//                       {/* Main Page URL: {websiteData.mainPageUrl} */}
//                     </h2>
//                     {websiteData.foundEmailsUrls.map(
//                       (foundEmailsUrl, foundEmailsUrlIndex) => (
//                         <div key={foundEmailsUrlIndex} className="mb-4">
//                           <h3 className="text-xl font-semibold mb-2">
//                             {/* Found on: {foundEmailsUrl.url} */}
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
//                                 {/* (Found on: {foundEmailsUrl.url}) */}
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
import {
  Tab,
  Tabs,
  CircularProgress,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Typewriter from "typewriter-effect";
import { useRouter } from "next/router";
import ClearIcon from "@mui/icons-material/Clear";
import { LuMousePointerClick } from "react-icons/lu";
import AccordionActions from "@mui/material/AccordionActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdStars } from "react-icons/md";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BusinessIcon from "@mui/icons-material/Business";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";

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

function Hero() {
  const [urlInput, setUrlInput] = useState<string>("");
  const [suggestedTexts, setSuggestedTexts] = useState<string[]>([]);
  const [domainExtension, setDomainExtension] = useState<string>("");
  const [responseData, setResponseData] = useState<WebsiteData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false); // State for showing/hiding suggestions

  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    console.log("responseData:", responseData);
  }, [responseData]);

  useEffect(() => {
    const storedRequestCount = localStorage.getItem("requestCount");
    if (storedRequestCount) {
      setRequestCount(Number(storedRequestCount));
    }
  }, []);

  const suggestTexts = useCallback(() => {
    // Predefined list of suggestions
    const predefinedSuggestions: string[] = [
      "dtu.ac.in",
      "aryabhattacollege.ac.in",
      "google.com",
      "growthsay.com",
    ];
    // Filter suggestions based on the current input value
    const filteredSuggestions = predefinedSuggestions.filter((text) =>
      text.toLowerCase().includes(urlInput.toLowerCase())
    );
    // Set the filtered suggestions
    setSuggestedTexts(filteredSuggestions);
    // Show suggestions only if there are filtered suggestions
    setShowSuggestions(filteredSuggestions.length > 0);
  }, [urlInput]);

  const sendData = useCallback(
    async (inputText: string) => {
      if (!inputText.trim() && !domainExtension) return;
      setLoading(true);
      setResponseData([]); // Clear previous result
      try {
        if (requestCount >= 2) {
          setError(
            "You have reached the request limit. Please login or register to continue."
          );
          return;
        }

        const processedUrlInput =
          inputText.trim().startsWith("http://") ||
          inputText.trim().startsWith("https://")
            ? inputText.trim()
            : `http://${inputText.trim()}`;

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

        if (response.data.websites.length === 0) {
          setError("Please check the URL or the server is busy.");
        } else {
          setResponseData(response.data.websites);
          setError(null);
          setRequestCount((prevCount) => {
            if (prevCount < 2) {
              const newCount = prevCount + 1;
              if (typeof localStorage !== "undefined") {
                localStorage.setItem("requestCount", String(newCount));
              }
              return newCount;
            }
            return prevCount;
          });
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

  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Email Finder | Home</title>
      </Head>
      <div className="h-full text-black">
        <div className="flex flex-col items-center justify-center">
          <div className="mt-10 sm:mt-20 text-center">
            <h1 className="text-4xl sm:text-6xl">Email Findly</h1>
            <h3 className="text-4xl sm:text-6xl text-purple-800">
              Empower Growth. Drive Success.
            </h3>
            <h3 className="text-4xl sm:text-6xl">
              <Typewriter
                options={{
                  strings: "Unleash Your Business Potential",
                  autoStart: true,
                  loop: true,
                }}
              />
            </h3>
          </div>

          <div className="mt-10 sm:mt-20 w-full max-w-md">
            {/* <Tabs
              value={selectedTab}
              onChange={(_, value) => setSelectedTab(value)}
              centered
              textColor="secondary"
            >
              <Tab label="Email by URL" style={{ fontWeight: "bold" }} />
              <Tab label="Coming Soon" style={{ fontWeight: "bold" }} />
            </Tabs> */}
            <div className="mt-5 px-4 flex justify-center items-start w-full max-w-md relative">
              <div className="flex flex-col w-full">
                <div className="flex gap-2">
                  <div className="flex relative w-full ">
                    <input
                      type="text"
                      disabled={loading || requestCount >= 2}
                      onChange={(e) => {
                        setUrlInput(e.target.value);
                        if (e.target.value.trim() === "") {
                          setShowSuggestions(false); // Hide suggestions when input is cleared
                        } else {
                          suggestTexts();
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value.trim() === "") {
                          setUrlInput("");
                          setShowSuggestions(false); // Hide suggestions when input is cleared
                        }
                      }}
                      value={urlInput}
                      className="form-input py-2 px-4 rounded-md border border-gray-300 w-full relative focus:outline-none"
                      placeholder={"Enter URL (e.g. example.com)"}
                    />
                    {urlInput && (
                      <IconButton
                        onClick={() => setUrlInput("")}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2"
                        size="small"
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                    {showSuggestions && (
                      <div className="absolute top-12 left-0 bg-white w-full border border-gray-300 rounded-lg z-10">
                        {suggestedTexts.map((text, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                              setUrlInput(text);
                              setShowSuggestions(false);
                              sendData(text);
                            }}
                          >
                            {text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => sendData(urlInput)}
                    disabled={loading || requestCount >= 2}
                    type="button"
                    className="py-2 px-4 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold"
                  >
                    Find
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 max-w-full">
            {requestCount >= 2 && (
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
              <div className="flex justify-center items-center h-20">
                <CircularProgress color="primary" />
              </div>
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
                      {websiteData.error}
                    </h2>
                    {websiteData.foundEmailsUrls.map(
                      (foundEmailsUrl, foundEmailsUrlIndex) => (
                        <div key={foundEmailsUrlIndex} className="mb-4">
                          <h3 className="text-xl font-semibold mb-2">
                            {foundEmailsUrl.error}
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
        <div className="mb-20">
          <div className="reviews flex justify-center">
            <div className="card w-100 rounded overflow-hidden">
              <div className="content flex gap-5 items-center">
                <div
                  className="text flex-1 p-4 justify-center items-center text-center"
                  style={{ marginLeft: "10%" }}
                >
                  <h1 className="text-4xl text-pink-600 font-bold">
                    Search Emails For Any Company Using A Company URLs
                  </h1>
                  <p className="mt-7 text-xl">
                    Say goodbye to tedious research and hello to streamlined
                    efficiency with Emailfindingly. Our innovative platform
                    offers a unique feature: extract emails directly by entering
                    a company's URL. It's as easy as a click, instantly
                    providing access to accurate and verified email addresses.
                  </p>
                </div>
                <div
                  className="image flex-1 rounded-xl mb-6 mt-6"
                  style={{ marginRight: "10%", borderRadius: "50%" }}
                >
                  <img
                    src="/email2.png"
                    alt="Image"
                    className="max-w-full h-auto rounded-3xl "
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="reviews flex justify-center mt-10">
            <div className="card w-100  rounded overflow-hidden">
              <div className="content flex gap-5 items-center">
                <div
                  className="image flex-1 rounded-xl mb-6 mt-6"
                  style={{ marginLeft: "10%", borderRadius: "50%" }}
                >
                  <img
                    src="/ss.png"
                    alt="Image"
                    className="max-w-full h-auto rounded-3xl"
                  />
                </div>
                <div
                  className="text flex-1 p-4 justify-center items-center text-center"
                  style={{ marginRight: "10%" }}
                >
                  <h1 className="text-4xl text-pink-600 font-bold">
                    Seamless Bulk Email Verification, Simplified{" "}
                  </h1>
                  <p className="mt-7 text-xl">
                    Emailfindingly introduces an effortless solution for bulk
                    email verification. Simply upload your email list in .XLS,
                    .CSV, or .TXT format, and our platform handles the rest.
                    With the ability to verify up to 10,000 emails per upload,
                    streamline your verification process and ensure data
                    accuracy with ease.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing: Amplify your marketing efforts by accessing comprehensive email lists tailored to your target audience.

Recruitment: Streamline your hiring process by swiftly finding contact information for potential candidates.

Networking: Expand your professional network by effortlessly connecting with industry experts and potential collaborators. */}

        <div className="m-32 ml-[10%] mr-[10%] flex-wrap">
          <h1 className="text-center text-4xl font-bold text-purple-800">
            Who uses Email Findly?
          </h1>
          <div className="flex gap-10 mt-20">
            <div className="flex flex-col items-center">
              {/* <LuMousePointerClick className="mb-2" size={40} /> */}
              <ShowChartIcon className="text-6xl mb-2 text-pink-600" />

              <h1 className="text-3xl mb-10 font-semibold text-black">Sales</h1>
              <p className="text-center">
                Find qualified leads, follow up, and convert better using
                Snov.io tools.
              </p>
            </div>
            <div className="flex flex-col items-center">
              {/* <LuMousePointerClick className="mb-2" size={40} /> */}
              <FlashOnOutlinedIcon className="text-6xl mb-2 text-pink-600" />

              <h1 className="text-3xl mb-10 font-semibold text-black">
                Marketing
              </h1>
              <p className="text-center">
                Amplify your marketing efforts by accessing comprehensive email
                lists tailored to your target audience.
              </p>
            </div>
            <div className="flex flex-col items-center">
              {/* <LuMousePointerClick className="mb-2" size={40} /> */}
              {/* <ShowChartIcon /> */}
              <BusinessIcon className="text-6xl mb-2 text-pink-600" />

              <h1 className="text-3xl mb-10 font-semibold text-black">
                Networking
              </h1>
              <p className="text-center">
                Expand your professional network by effortlessly connecting with
                industry experts and potential collaborators.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20 mt-10 ml-[20%] mr-[20%] ">
          <h1 className="flex justify-center text-4xl mb-10 font-bold">
            Frequently asked questions
          </h1>
          <Accordion className="mb-7 bg-gray-100">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <div className="flex items-center gap-3">
                <MdStars size={20} color="red" />
                <h2 className="text-2xl text- font-semibold">
                  What is a Credit ?
                </h2>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-xl">
                Credit is a payment unit exchanged for Email Finder and Verifier
                services. You can distribute your credits between the tools as
                you like.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion className="mb-7 bg-gray-100">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <div className="flex items-center gap-3">
                <MdStars size={20} color="blue" />

                <h2 className="text-2xl font-semibold">
                  What is a Recipient ?
                </h2>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-xl">
                Recipient is a payment unit in the Drip Campaigns tool. 1
                recipient is charged when you first contact a lead. All
                follow-ups to that lead in the same billing period are free and
                unlimited.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion className="mb-7 bg-gray-100">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <div className="flex items-center gap-3">
                <MdStars size={20} color="green" />

                <h2 className="text-2xl font-semibold">
                  Do credit cost less on Larger Plans ?
                </h2>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-xl">
                Yes! The larger the plan - the less you pay per credit and per
                recipient.[ For example there are 7000 credits on our Startup
                plans which costs $29/month while on Agency Plans , credits are
                70,000/month which costs $209/month.] Your price per lead
                changes drastically depending on your plan, so consider getting
                a larger plan if you’re choosing between two.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion className="mb-7 bg-gray-100">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <div className="flex items-center gap-3">
                <MdStars size={20} color="darkgreen" />
                <h2 className="text-2xl font-semibold">
                  Is Emailfindly right for my Business?
                </h2>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-xl">
                Emailfindly was built for businesses and agencies of all sizes.
                As long as you want to grow your sales and improve your
                workflow,it is for you. If you’re hesitating and would like to
                find out more, with us to discuss specific problems you’re
                looking to solve with Snov.io.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion className="mb-7 bg-gray-100">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <div className="flex items-center gap-3">
                <MdStars size={20} color="orange" />
                <h2 className="text-2xl font-semibold">
                  Which tools does Emailfindly offer?
                </h2>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-xl">
                It provides Email finder directly from company’s URL Link or
                from company’s name along with Bulk Email Provider option.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion className="mb-7 bg-gray-100">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <div className="flex items-center gap-3">
                <MdStars size={20} color="orange" />
                <h2 className="text-2xl font-semibold">
                  I have more questions.
                </h2>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-xl">
                We’re always here to help! Don’t hesitate to drop your questions
                in the chat or email us at.
                <br />
                <a className="text-blue-900 hover:text-blue-600" href="">
                  emailfindly@dummy.com
                </a>
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Hero;
