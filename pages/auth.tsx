import Head from "next/head";
import AuthPage from "@/components/AuthPage";

function Auth() {
  return (
    <>
      <Head>
        <title>Email Hunter | Login/Signup</title>
      </Head>
      <AuthPage />
    </>
  );
}

export default Auth;
