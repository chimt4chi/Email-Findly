import React from "react";

function PricingTable() {
  return (
    <div className="container mx-auto">
      <div className="flex item-center justify-center text-center text-4xl my-10">
        {/* <h1 className=" text-orange-500  "></h1>
          <span className="text-orange-500"></span> */}
        <h1 className="text-orange-500">
          Monthly Yearly Bulk Email Extraction
        </h1>
      </div>
      <div className="my-8">
        <h3 className="ml-32 mb-6 text-2xl text-white">
          1. Bulk Email Extraction
        </h3>
        <div className="flex justify-center">
          <div className="overflow-x-auto rounded-md flex items-center justify-center">
            <table className="table-auto w-[78%]  bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-4xl text-center">
                    Free Tier
                  </th>
                  <th className="border px-4 py-2 text-4xl text-center">
                    Startup Plans
                  </th>
                  <th className="border px-4 py-2 text-4xl text-center">
                    Professional Plans
                  </th>
                  <th className="border px-4 py-2 text-4xl text-center">
                    Agency Plans
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 text-2xl text-center">
                    $0/first week
                  </td>
                  <td className="border px-4 py-2 text-2xl text-center">
                    $29/month
                  </td>
                  <td className="border px-4 py-2 text-2xl text-center">
                    $209/month
                  </td>
                  <td className="border px-4 py-2 text-2xl text-center">
                    <button className="text-white bg-blue-500 p-2 rounded-md">
                      Contact us
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-4 text-xl py-2 text-center">
                    Explore the power of our platform with 25 free credits—only
                    pay if you love it.
                  </td>
                  <td className="border text-xl px-4 py-2 text-center">
                    Best for small companies
                  </td>
                  <td className="border px-4 text-xl py-2 text-center">
                    Best for growing companies
                  </td>
                  <td className="border px-4 text-xl py-2 text-center">
                    For Bulk needs
                  </td>
                </tr>
                <tr>
                  <td className="border text-xl px-4 py-2 text-center">-</td>
                  <td className="border text-xl px-4 py-2 text-center">
                    Free (Launch Offer)
                  </td>
                  <td className="border text-xl px-4 py-2 text-center">
                    Free (Launch Offer)
                  </td>
                  <td className="border text-xl px-4 py-2 text-center">-</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border text-xl px-4 py-2 text-center">
                    25 credits
                  </td>
                  <td className="border text-xl px-4 py-2 text-center">
                    7,000 credits
                  </td>
                  <td className="border text-xl px-4 py-2 text-center">
                    70,000 credits
                  </td>
                  <td className="border text-xl px-4 py-2 text-center">
                    Unlimited Credits
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="my-8">
        <h3 className="ml-32 mb-6 text-2xl text-white">
          2. Get your leads’ website URL in bulk (Pay as you go service)
        </h3>
        <div className="flex justify-center">
          <div className="overflow-x-auto flex items-center justify-center">
            <table className="table-auto w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-center text-2xl">
                    Free Tier
                  </th>
                  <th className="border px-4 py-2 text-center text-2xl">
                    Startup Plans
                  </th>
                  <th className="border px-4 py-2 text-center text-2xl">
                    Professional Plans
                  </th>
                  <th className="border px-4 py-2 text-center text-2xl">
                    Agency Plans
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border text-xl px-4 py-2 text-center">
                    $0/first week
                  </td>
                  <td className="border text-xl px-4 py-2 text-center">
                    $49 /month
                  </td>
                  <td className="border text-xl px-4 py-2 text-center">
                    $79 /month
                  </td>
                  <td className="border text-xl px-4 py-2 text-center">
                    <button className="text-orange-500 hover:text-orange-700 p-2 rounded-md">
                      Contact now
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border text-xl px-4 py-2 text-center">
                    25 Free leads
                  </td>
                  <td className="border text-xl px-4 py-2 text-center">
                    600 Leads [website url + Decision maker LinkedIn ID]
                  </td>
                  <td className="border text-xl px-4 py-2 text-center">
                    3000 Leads
                  </td>
                  <td className="border text-xl px-4 py-2 text-center">
                    5000+ Leads
                  </td>
                </tr>
                <tr className="text-center">
                  <td className="border px-4 py-2">
                    <button className="text-orange-500 hover:text-orange-700 text-xl p-2 rounded-md">
                      Get Started
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button className="text-orange-500 hover:text-orange-700 text-xl p-2 rounded-md">
                      Get Started
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button className="text-white bg-blue-500 p-2 rounded-md">
                      Get Started
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button className="text-white bg-blue-500 p-2 rounded-md">
                      Get Started
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingTable;
