import axios from "axios";
import Input from "@/components/Input";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRouter } from "next/router";
import Head from "next/head";

function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { variant } = router.query;

  // const toggleVariant = useCallback(() => {
  //   setVariant((currentVariant) =>
  //     currentVariant === "login" ? "register" : "login"
  //   );
  // }, []);

  const toggleVariant = useCallback(() => {
    const newVariant = variant === "login" ? "register" : "login";
    router.push(`/auth?variant=${newVariant}`);
  }, [variant, router]);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [name, email, password, login]);

  return (
    <>
      <Head>
        <title>Email Hunter | Login/Signup</title>
      </Head>

      <div className="min-h-screen mt-20 flex justify-center">
        <div className="bg-gradient-to-t from-purple-500/70 to-pink-500/70 border shadow opacity-90 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md md:max-w-md sm:max-w-md rounded-md w-full">
          <h2 className="text-black text-4xl mb-10 font-semibold text-center">
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
            className=" py-3 text-white rounded-md w-full mt-10  bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 transition"
          >
            <span className="">
              {variant === "login" ? "Login" : "Register"}
            </span>
          </button>
          <div className="flex gap-4 mt-8 justify-center items-center">
            {/* <div
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              // className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              className="flex items-center justify-center cursor-pointer py-3 gap-x-2 text-black bg-white rounded-md w-full   transition"
            >
              <FaGithub size={30} />
            </div> */}
            <div
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              // className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              className="flex items-center justify-center cursor-pointer py-3 gap-x-2 text-black bg-white rounded-md w-full hover:opacity-80 transition"
            >
              <FcGoogle size={30} />
              <span>Sign in with Google</span>
            </div>
          </div>
          <p className="text-black font-semibold  mt-12 text-center">
            {variant === "login"
              ? "First time using Email Findly?"
              : "Already have and account?"}
            <span
              onClick={toggleVariant}
              className="text-white ml-1 hover:underline hover:underline-offset-8 cursor-pointer"
            >
              {variant === "login" ? "Create an Account" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
