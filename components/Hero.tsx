import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Tab, Tabs } from "@mui/material";

import Typewriter from "typewriter-effect";

function Hero() {
  const [isShow, setIsShow] = useState<boolean>(true);

  const updateIsShow = (event: React.ChangeEvent<{}>, value: number) => {
    setIsShow(value === 0);
  };

  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Email Finder | Home</title>
      </Head>
      <div className="h-screen  text-black">
        <div className="flex flex-col items-center justify-center">
          <div className="grad-circle"></div>

          <div className="mt-20">
            <h1 className="text-6xl">
              {/* <Typewriter
                options={{
                  strings: "Email Finder",
                  autoStart: true,
                  loop: true,
                }}
              /> */}
              Email Finder
            </h1>
            <h3 className="text-6xl text-purple-800">
              {" "}
              {/* <Typewriter
                options={{
                  strings: "Find the verified email address",
                  autoStart: true,
                  loop: true,
                }}
              /> */}
              Find the verified email address{" "}
            </h3>
            <h3 className="text-6xl">
              <Typewriter
                options={{
                  strings: "of any professional",
                  autoStart: true,
                  loop: true,
                }}
              />
              {/* of any professional */}
            </h3>
          </div>
          <div className="mt-20">
            <Tabs onChange={updateIsShow}>
              <Tab
                style={{
                  color: "black",
                  fontWeight: "bold",
                }}
                label="Find email by URL"
              />
              <Tab
                style={{
                  color: "black",
                  fontWeight: "bold",
                }}
                label="Email verifier"
              />
              <Tab
                style={{
                  color: "black",
                  fontWeight: "bold",
                }}
                label="Website url"
              />
            </Tabs>
          </div>

          <div className="mt-5 flex items-center justify-center">
            <input
              type="text"
              className="form-input mr-2 py-2 px-4 rounded-lg border border-gray-300"
              placeholder={isShow ? "Enter URL" : "Enter Email"}
            />
            <button className="py-2 px-4 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold">
              Find
            </button>
          </div>

          <div className="flex flex-col justify-center items-center mt-10">
            Trusted by leading companies
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
