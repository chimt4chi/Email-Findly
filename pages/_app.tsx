import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludeHeaderPages = [
    // "/auth",
    "/rough",
    "/dashboard",
    "/dashboard/upload",
    "/dashboard/emailFinder",
  ];
  const excludeFooterPages = ["/auth"]; // Add the path of the auth page here
  const showHeader = !excludeHeaderPages.includes(router.pathname);
  const showFooter = !excludeFooterPages.includes(router.pathname);
  return (
    <>
      {showHeader && <Header showHeader={showHeader} />}
      <Component {...pageProps} />
      {/* {showFooter && <Footer showHeader={showHeader} />} */}
    </>
  );
}
