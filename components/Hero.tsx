import React, { useCallback, useEffect, useState, Fragment } from "react";
import Head from "next/head";
import axios from "axios";
import { CircularProgress, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import ClearIcon from "@mui/icons-material/Clear";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { ChartPieIcon, CursorArrowRaysIcon } from "@heroicons/react/24/outline";

import { MdOutlineContentCopy } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";

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
  { name: "Pricing", href: "/pricing" },
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

  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyToClipboard = (emailToCopy: string) => {
    navigator.clipboard.writeText(emailToCopy);
    setCopiedEmail(emailToCopy);
    // Remove the animation class after 2 seconds
    setTimeout(() => setCopiedEmail(null), 2000);
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

  const suggestTexts = useCallback(() => {
    // Predefined list of suggestions
    const predefinedSuggestions = [
      "dtu.ac.in",
      "aryabhattacollege.ac.in",
      "google.com",
      "growthsay.com",
    ];

    // Check if the input exactly matches any predefined suggestion
    const isMatchingInput = predefinedSuggestions.some(
      (text) => text.toLowerCase() === urlInput.toLowerCase()
    );

    // Set the filtered suggestions
    setSuggestedTexts(
      isMatchingInput
        ? []
        : predefinedSuggestions.filter((text) =>
            text.toLowerCase().includes(urlInput.toLowerCase())
          )
    );

    // Show suggestions only if there are filtered suggestions and the current input doesn't exactly match any suggestion
    setShowSuggestions(isMatchingInput ? false : suggestedTexts.length > 0);
  }, [urlInput, suggestedTexts]);

  const sendData = useCallback(
    async (inputText: string) => {
      if (!inputText.trim() && !domainExtension) return;
      setLoading(true);
      setResponseData([]); // Clear previous result
      setError(null); // Clear previous error
      try {
        if (requestCount >= 100) {
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
          setError(
            "Please check the URL, Make sure the website is up an running."
          );
        } else {
          setResponseData(response.data.websites);
          setShowSuggestions(false); // Close suggestions when data is fetched
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
    <>
      <Head>
        <title>Email Finder | Home</title>
      </Head>
      <div className="min-h-screen">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
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
            <div className="hidden lg:flex lg:gap-x-12">
              <header>
                <nav
                  className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                  aria-label="Global"
                >
                  <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                      <span className="sr-only">Your Company</span>
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
                      onClick={() => router.push("/pricing")}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Pricing
                    </button>
                  </Popover.Group>
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
                                <Disclosure.Panel className="mt-2 space-y-2"></Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                          <a
                            href="#"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Features
                          </a>
                          <a
                            href="#"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Marketplace
                          </a>
                          <a
                            href="#"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Company
                          </a>
                        </div>
                        <div className="py-6">
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
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-10 items-center">
              <button
                onClick={() => handleNavigate("register")}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Register
              </button>
              <button
                onClick={() => handleNavigate("login")}
                className="text-sm font-semibold leading-6 text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 p-2 rounded-md"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </nav>
          {/* Mobile Menu */}
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
                            {[...products].map((item) => (
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
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Pricing
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
        <div className="mx-auto max-w-2xl py-32 sm:py-28 flex flex-col items-center">
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
                  type="text"
                  disabled={loading || requestCount >= 100}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    if (e.target.value.trim() === "") {
                      setShowSuggestions(false);
                    } else {
                      suggestTexts();
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value.trim() === "") {
                      setUrlInput("");
                      setShowSuggestions(false);
                    }
                  }}
                  value={urlInput}
                  className="form-input py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter URL (e.g. example.com)"
                />
                {urlInput && (
                  <button
                    onClick={() => setUrlInput("")}
                    className="absolute right-2 top-5 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                  >
                    <ClearIcon className="h-6 w-6 text-gray-500" />
                  </button>
                )}
                <button
                  onClick={() => {
                    sendData(urlInput);
                    setShowSuggestions(false); // Add this line to hide suggestions when the button is clicked
                  }}
                  disabled={loading || requestCount >= 100}
                  type="button"
                  className="rounded-md bg-indigo-600 text-sm font-semibold py-2 px-4 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
                >
                  Find
                </button>
              </div>

              <div className="relative">
                {showSuggestions && (
                  <div className="absolute top-4 left-0 bg-white w-full border border-gray-300 rounded-lg z-10">
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
                  <div className="w-full mx-2">
                    <div className="mt-20 bg-[#efeeee] rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
                      <Skeleton className="bg-indigo-600 h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="bg-indigo-600 h-6 w-[250px]" />
                        {/* <Skeleton className="h-4 w-[250px]" /> */}
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="bg-indigo-600 h-4 w-4 rounded-full" />
                        <Skeleton className="bg-indigo-600 h-4 w-4 rounded-full" />
                        <Skeleton className="bg-indigo-600 h-4 w-4 rounded-full" />
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
                        <h2 className="text-2xl font-bold mb-4">
                          {websiteData.error}
                        </h2>
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
                                          <p className="text-indigo-600">
                                            {email.includes("mailto:")
                                              ? email
                                                  .split("mailto:")[1]
                                                  .split("?")[0]
                                              : email}
                                          </p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                          <FaLinkedinIn
                                            size={16}
                                            className="cursor-pointer"
                                          />
                                          <MdOutlineContentCopy
                                            className="cursor-pointer"
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
                                          <SiGmail
                                            className="cursor-pointer"
                                            size={16}
                                          />
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

export default Hero;
