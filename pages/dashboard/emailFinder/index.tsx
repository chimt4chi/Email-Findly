import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Head from "next/head";
import MiniDrawer from "@/components/DrawerHeader";

const tabLabels = ["Find email by URL", "Email verifier", "Website url"];

function Index() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [placeholderText, setPlaceholderText] = useState<string>("Enter URL");

  const updateIsShow = (event: React.ChangeEvent<{}>, value: number) => {
    setSelectedTab(value);
    setPlaceholderText(
      value === 0
        ? "Enter URL"
        : value === 1
        ? "Enter Email"
        : "Enter Website URL"
    );
  };

  return (
    <div>
      <Head>
        <title>Email Finder</title>
      </Head>
      <MiniDrawer />
      <div className="h-screen text-black">
        <div className="flex flex-col items-center justify-center">
          <div className="grad-circle"></div>

          <div className="mt-20">
            <h1 className="text-6xl">Email Finder</h1>
            <h3 className="text-6xl text-purple-800">
              Find the verified email address
            </h3>
            <h3 className="text-6xl"> of any professional</h3>
          </div>
          <div className="mt-20">
            <Tabs onChange={updateIsShow}>
              {tabLabels.map((label, index) => (
                <Tab
                  key={index}
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                  label={label}
                />
              ))}
            </Tabs>
          </div>

          <div className="mt-5 flex items-center justify-center">
            <input
              type="text"
              className="form-input mr-2 py-2 px-4 rounded-lg border border-gray-300"
              placeholder={placeholderText}
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

export default Index;
