import Dash from "@/components/Dash";
import MiniDrawer from "@/components/DrawerHeader";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";

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

function index() {
  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };
  return (
    <>
      <div>
        <Head>
          <title>Bulk Email Verification | Upload Bulk Emails</title>
        </Head>
      </div>
      {/* <Dash title="upload" /> */}
      <MiniDrawer />
      <div className="p-4 flex justify-evenly">
        <h5 className="inline-block m-0 text-4xl text-purple-800 font-mono font-bold">
          BULK EMAIL VERIFICATION
        </h5>
        <button
          type="button"
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          Upgrade
        </button>
      </div>

      <div className="bg-transparent  rounded px-8 pt-6 pb-8 mt-10 mb-4">
        {/* <div className="mb-4 flex items-center justify-center">
          <h4 className="text-white text-2xl">Premium feature</h4>
          <Link
            href={"/pricing"}
            type="button"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ml-20"
          >
            View Plans
          </Link>
        </div> */}
        <p className="text-center text-black text-2xl">
          Upgrade your plan to unlock Bulk Email Verification and verify upto
          100,000 Emails
        </p>
      </div>

      <div
        className="bg-gradient-to-t from-purple-500/10 to-pink-500/10  rounded px-8 pt-6 pb-8 mb-4"
        style={{ maxWidth: "70%", margin: "0 auto" }}
      >
        <p className="text-black text-base mb-4 " style={{ fontSize: "1.1em" }}>
          Verify Emails in bulk using our multilayer Verification process that
          includes syntax check, MX check, and SMTP authentication.
        </p>
        <div
          className="bg-pink-300/30 rounded-lg p-8 text-center"
          style={{ height: "170px" }}
        >
          <h5 className="mb-4">Upload or drop a file here</h5>
          <input id="fileInput" type="file" className="hidden" />
          <label htmlFor="fileInput" className="cursor-pointer">
            <button
              type="button"
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUploadButtonClick}
            >
              Upload
            </button>
          </label>
          <p className="text-sm text-black mt-4">
            Bulk email Verification supports .XLS, CSV and TXT file formats and
            can process up to 10,000 emails per upload
          </p>
        </div>
      </div>
    </>
  );
}

export default index;
