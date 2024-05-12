// // Emails

import Dash from "@/components/Dash";
import MiniDrawer from "@/components/DrawerHeader";
import Sidebar2 from "@/components/Sidebar2";
import TestComp from "@/components/TestComp";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import * as XLSX from "xlsx";

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

function Index() {
  const [emails, setEmails] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (typeof data === "string" || data instanceof ArrayBuffer) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData: any[] = XLSX.utils.sheet_to_json(sheet);

          const extractedEmails: string[] = [];

          parsedData.forEach((obj) => {
            for (const key in obj) {
              const value = obj[key];
              if (typeof value === "string" && value.includes("@")) {
                extractedEmails.push(value);
              }
            }
          });

          setEmails(extractedEmails);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  return (
    <div className="">
      <div>
        <Head>
          <title>Bulk Email Verification | Upload Bulk Emails</title>
        </Head>
      </div>
      {/* <MiniDrawer /> */}
      <Sidebar2 />
    </div>
  );
}

export default Index;
