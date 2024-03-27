import PricingCard from "@/components/PricingCard";
import PricingTable from "@/components/PricingTable";
import {
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import "@/components/test.module.css";

function Page() {
  const [plan, setPlan] = useState(true);

  const togglePlan = () => {
    setPlan((prev) => !prev);
  };
  // const [alignment, setAlignment] = React.useState("url");
  const [alignment, setAlignment] = useState("email");
  const showURL = () => {
    setPlan(!true);
  };
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const showEmail = () => {
    setPlan(true);
  };

  return (
    <div>
      <Head>
        <title>Email Findly | Pricing</title>
      </Head>
      {/* <PricingTable /> */}
      <main className="mb-20 mt-20">
        <div className="flex gap-6 items-center justify-center flex-wrap ">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-black text-4xl">Plans & pricing</h1>
            <br />
            <h1 className="text-black text-6xl">Select the right plan</h1>
            <br />
            <h1 className="text-purple-800 text-6xl font-roboto">
              for your business.
            </h1>
            <div className="px-6 py-7 ">
              <div className="flex gap-2 items-center text-2xl   p-2 rounded-md">
                {/* bg color for card */}
                {/* rgb(37 39 43) */}
                {/* #6d778b */}
                {/* <button
                  onClick={showEmail}
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Email
                </button>
                <button
                  onClick={showURL}
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  URL
                </button> */}
                <span
                  className={`${plan ? "underline underline-offset-8" : ""}`}
                >
                  Email
                </span>
                <Switch
                  checked={!plan}
                  onChange={togglePlan}
                  color="secondary"
                  value="dynamic-class-name"
                  style={{}}
                />
                <span
                  className={`${plan ? "" : "underline underline-offset-8"}`}
                >
                  URL
                </span>
              </div>
            </div>
          </div>
          <div className="container mx-auto">
            <div className="flex justify-center">
              <PricingCard
                title="Free Tier"
                price="$0/first week"
                features={
                  plan
                    ? [
                        "Explore the power of our platform with 25 free credits—only pay if you love it.",

                        "25 credits",
                      ]
                    : ["$25/leads", "25 Free leads"]
                }
              />
              <PricingCard
                title="Startup Plans"
                price={plan ? "$29/month" : "$49/month"}
                features={
                  plan
                    ? [
                        "Best for small companies",
                        "Free (Launch Offer)",
                        "7,000 credits",
                      ]
                    : ["600 Leads [website url + Decision maker LinkedIn ID]	"]
                }
              />
              <PricingCard
                title="Agency Plans"
                price={plan ? "$209/month" : "$79/month"}
                features={
                  plan
                    ? [
                        "Best for growing companies",
                        "Free (Launch Offer)",
                        "70,000 credits",
                      ]
                    : ["3000 Leads"]
                }
              />
              <PricingCard
                title="Professional Plans"
                price="Contact us"
                features={
                  plan
                    ? ["For Bulk needs", "Unlimited Credits"]
                    : ["3000 Leads"]
                }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
