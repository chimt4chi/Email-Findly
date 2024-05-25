import axios from "axios";
import Input from "@/components/Input";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import Head from "next/head";
import { CircularProgress } from "@mui/material";

function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const { variant } = router.query;

  const toggleVariant = useCallback(() => {
    const newVariant = variant === "login" ? "register" : "login";
    router.push(`/auth?variant=${newVariant}`);
  }, [variant, router]);

  const login = useCallback(async () => {
    setLoading(true);
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard/bulkEmail",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    setLoadingAction(true);
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAction(false);
    }
  }, [name, email, password, login]);

  const handleGoogleSignIn = useCallback(async () => {
    setLoadingGoogle(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard/bulkEmail" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingGoogle(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Email Hunter | Login/Signup</title>
      </Head>

      <div className="flex min-h-screen items-center justify-center mt-2 lg:-mt-16">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="p-6 bg-gray-100 shadow-md rounded-lg"
          style={{ width: "400px" }}
        >
          <h2 className="text-black tracking-tight text-4xl mb-10 font-semibold text-center">
            {variant === "login" ? "Login" : "Register"}
          </h2>
          <div className="flex flex-col gap-4">
            {variant === "register" && (
              <Input
                onChange={(e: any) => setName(e.target.value)}
                label="Username"
                id="name"
                type="name"
                value={name}
              />
            )}
            <Input
              label="Email"
              onChange={(e: any) => setEmail(e.target.value)}
              id="username"
              type="username"
              value={email}
            />
            <Input
              label="Password"
              onChange={(e: any) => setPassword(e.target.value)}
              id="password"
              type="password"
              value={password}
            />
          </div>
          <button
            onClick={variant === "login" ? login : register}
            className="py-3 text-white rounded-md w-full mt-10 bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 p-2"
          >
            {loading && variant === "login" ? (
              <CircularProgress size={20} color="primary" />
            ) : loadingAction && variant === "register" ? (
              <CircularProgress size={20} color="primary" />
            ) : (
              <span>{variant === "login" ? "Login" : "Register"}</span>
            )}
          </button>
          <div className="flex gap-4 mt-8 justify-center items-center">
            <div
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center cursor-pointer py-3 gap-x-2 text-black bg-white rounded-md w-full hover:opacity-80 transition"
            >
              {loadingGoogle ? (
                <CircularProgress size={20} color="primary" />
              ) : (
                <FcGoogle size={30} />
              )}
              {loadingGoogle
                ? null
                : variant === "login"
                ? "Sign in with Google"
                : "Sign up with Google"}
            </div>
          </div>
          <p className="text-black font-semibold mt-12 text-center">
            {variant === "login"
              ? "First time using Email Findly?"
              : "Already have an account?"}
            <span
              onClick={toggleVariant}
              className="text-indigo-600 ml-1 hover:underline hover:underline-offset-8 cursor-pointer"
            >
              {variant === "login" ? "Create an Account" : "Login"}
            </span>
          </p>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
