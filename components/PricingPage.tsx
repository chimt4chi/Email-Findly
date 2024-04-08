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
            <div className="bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 flex gap-2 items-center text-xl p-2 rounded-full justify-center">
              <span
                onClick={showEmail}
                className={`cursor-pointer hover:text-white font-bold py-2 px-4 rounded w-full ${
                  plan ? "text-white " : ""
                }`}
              >
                Email
              </span>
              <span
                onClick={showURL}
                className={`cursor-pointer hover:text-white font-bold py-2 px-4 rounded w-full ${
                  !plan ? "text-white" : ""
                }`}
              >
                URL
              </span>
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
                      "25 credits",
                      "Explore the power of our platform with 25 free credits—only pay if you love it.",
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
                      "7,000 credits",
                      "Best for small companies",
                      "Free (Launch Offer)",
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
                      "70,000 credits",
                      "Best for growing companies",
                      "Free (Launch Offer)",
                    ]
                  : ["3000 Leads"]
              }
            />
            <PricingCard
              title="Pro Plans"
              price="Contact us"
              features={
                plan ? ["Unlimited Credits", "For Bulk needs"] : ["3000 Leads"]
              }
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default PricingPage;
