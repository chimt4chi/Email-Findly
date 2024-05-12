import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import ClearIcon from "@mui/icons-material/Clear";
import { Skeleton } from "@/components/ui/skeleton";

import { SiGmail } from "react-icons/si";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MdCheckCircle, MdOutlineContentCopy } from "react-icons/md";
import TestComp from "./TestComp";

function BulkLinkedin() {
  return (
    <>
      <Head>
        <title>Email Finder | Home</title>
      </Head>
      <div className="min-h-screen " style={{ marginTop: "-100px" }}>
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
              Find LinkedIn
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
        <TestComp />
      </div>
    </>
  );
}

export default BulkLinkedin;
