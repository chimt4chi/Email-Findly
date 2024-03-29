import PricingCard from "@/components/PricingCard";
import { FormControlLabel, Switch } from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
function PricingPage() {
  const [plan, setPlan] = useState(true);

  const togglePlan = () => {
    setPlan((prev) => !prev);
  };

  const showEmail = () => {
    setPlan(true);
  };

  const showURL = () => {
    setPlan(false);
  };
  return (
    <>
      <main className="mb-20 mt-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-black text-4xl text-center">Plans & Pricing</h1>
          <h2 className="text-black text-6xl text-center">
            Select the right plan
          </h2>
          <h3 className="text-purple-800 text-6xl font-roboto text-center">
            for your business.
          </h3>
          <div className="px-6 py-7 mt-6">
            <div className="flex gap-2 items-center text-2xl p-2 rounded-md justify-center">
              {/* <span
                className={`${plan ? "underline underline-offset-8" : ""}`}
                onClick={showEmail}
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
                onClick={showURL}
              >
                URL
              </span> */}
              <button
                onClick={showEmail}
                className="bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold py-2 px-4 rounded w-full   "
              >
                Email
              </button>
              <button
                onClick={showURL}
                className="bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold py-2 px-4 rounded w-full"
              >
                URL
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-center">
            <PricingCard
              title="Free Tier"
              price={plan ? "$0/first week" : "$25/leads"}
              features={
                plan
                  ? [
                      "Explore the power of our platform with 25 free credits—only pay if you love it.",
                      "25 credits",
                    ]
                  : ["25 Free leads"]
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
                  : ["600 Leads [website url + Decision maker LinkedIn ID]"]
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
                plan ? ["For Bulk needs", "Unlimited Credits"] : ["3000 Leads"]
              }
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default PricingPage;
