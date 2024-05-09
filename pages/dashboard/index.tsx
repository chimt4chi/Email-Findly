import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";

// Icons

import Dash from "@/components/Dash";
import Head from "next/head";
import MiniDrawer from "@/components/DrawerHeader";
import Sidebar2 from "@/components/Sidebar2";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

function dashboard() {
  return (
    <div>
      <div>
        <Head>
          <title>Dashboard Home</title>
        </Head>
      </div>
      {/* <div className="h-screen bg-gray-900 text-white">
        <Dash title="Upload Page" />
      </div> */}
      {/* <Dash title="home" /> */}
      {/* <h1>Dashboard Home</h1> */}
      {/* <MiniDrawer /> */}
      <Sidebar2 />
    </div>
  );
}

export default dashboard;
