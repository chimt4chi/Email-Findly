import Footer2 from "@/components/Footer2";
import Footer3 from "@/components/Footer3";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import Sidebar2 from "@/components/Sidebar2";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludeHeaderPages = [
    // "/auth",
    "/test",
    "/rough",
    "/dashboard",
    "/dashboard/bulkEmail",
    "/dashboard/bulkLinkedin",
    "/dashboard/linkedinFinder",
    "/dashboard/emailFinder",
  ];
  const excludeFooterPages = ["/auth"]; // Add the path of the auth page here
  const showHeader = !excludeHeaderPages.includes(router.pathname);
  const showFooter = !excludeFooterPages.includes(router.pathname);
  return (
    <>
      {showHeader && <Header showHeader={showHeader} />}
      <Component {...pageProps} />
      {showFooter && <Footer3 showHeader={showHeader} />}
      {/* {showFooter && <Sidebar2 showHeader={showHeader} />} */}
    </>
  );
}
