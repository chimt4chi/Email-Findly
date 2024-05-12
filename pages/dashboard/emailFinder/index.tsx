import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Head from "next/head";
import MiniDrawer from "@/components/DrawerHeader";
import Hero from "@/components/Hero";
import Sidebar2 from "@/components/Sidebar2";

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
      <Sidebar2 />
      {/* <Hero /> */}
    </div>
  );
}

export default Index;
