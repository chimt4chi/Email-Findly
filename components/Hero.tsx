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

import React, { useCallback, useEffect, useState, Fragment } from "react";
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
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import Logo from "./Logo";
import Features from "./Features";
import Why from "./Why";
import WhoUses from "./WhoUses";
import Footer2 from "./Footer2";

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
const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const products = [
  {
    name: "Bulk Email Finder",
    description: "Get a better understanding of your traffic",
    href: "/product/bulkUpload",
    icon: ChartPieIcon,
  },
  {
    name: "Linkedin Finder",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  // {
  //   name: "Security",
  //   description: "Your customers’ data will be safe and secure",
  //   href: "#",
  //   icon: FingerPrintIcon,
  // },
  // {
  //   name: "Integrations",
  //   description: "Connect with third-party tools",
  //   href: "#",
  //   icon: SquaresPlusIcon,
  // },
  // {
  //   name: "Automations",
  //   description: "Build strategic funnels that will convert",
  //   href: "#",
  //   icon: ArrowPathIcon,
  // },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavigate = (variant: string) => {
    router.push({
      pathname: "/auth",
      query: { variant },
    });
  };

  return (
    <div className="">
      <div className="bg-white">
        <header className="bg-white z-20">
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <Popover.Group className="hidden lg:flex lg:gap-x-12">
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  Product
                  <ChevronDownIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {products.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <item.icon
                              className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-auto">
                            <a
                              href={item.href}
                              className="block font-semibold text-gray-900"
                            >
                              {item.name}
                              <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>

              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Features
              </a>
              <button
                // href="#"
                onClick={() => router.push("/pricing")}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Pricing
              </button>
            </Popover.Group>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-10 items-center">
              <button
                // href="#"
                onClick={() => handleNavigate("register")}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Register
              </button>
              <button
                // href="#"
                onClick={() => handleNavigate("login")}
                className="text-sm font-semibold leading-6 text-white bg-indigo-600 p-2 rounded-md"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-10" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Disclosure as="div" className="-mx-3">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            Product
                            <ChevronDownIcon
                              className={classNames(
                                open ? "rotate-180" : "",
                                "h-5 w-5 flex-none"
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 space-y-2">
                            {[...products, ...callsToAction].map((item) => (
                              <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                {item.name}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Features
                    </a>
                    {/* <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Marketplace
                    </a> */}
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Features
                    </a>
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Register
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>
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
        <div className="mx-auto max-w-2xl py-32 sm:py-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-6xl">
              Email Findly
            </h1>
            <span className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Empower Growth Drive Success.
            </span>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 relative">
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
                className="form-input py-2 px-4 rounded-md border border-gray-300 w-80 relative focus:outline-none"
                placeholder={"Enter URL (e.g. example.com)"}
              />
              {urlInput && (
                <IconButton
                  onClick={() => setUrlInput("")}
                  className="absolute right-16 top-5 transform -translate-y-1/2"
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
              <button
                onClick={() => sendData(urlInput)}
                disabled={loading || requestCount >= 2}
                type="button"
                className="rounded-md bg-indigo-600  text-sm font-semibold py-3 px-5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
              >
                Find
              </button>

              {/* <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a> */}
            </div>
          </div>
        </div>
        {/* <div
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
        </div> */}
        <main>
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
        </main>
      </div>
      <Logo />
      <Features />
      <Why />
      <WhoUses />
      <Footer2 />
      <Head>
        <title>Email Finder | Home</title>
      </Head>
    </div>
  );
}

export default Hero;
