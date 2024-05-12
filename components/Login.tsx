import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login2() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { variant } = router.query;

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

  return (
    <>
      <Head>
        <title>Email Hunter | Login/Signup</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center mt-10">
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
          className=" p-6 bg-gray-100 shadow-md rounded-lg"
          style={{ width: "400px" }}
        >
          <div className="flex flex-col items-center">
            <img
              className="h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <form className="mt-8 space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                id="username"
                type="username"
                name="email"
                value={email}
                autoComplete="email"
                required
                className="mt-1 h-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
                autoComplete="current-password"
                required
                className="mt-1 block h-9 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
            <div
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              // className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              className="flex items-center justify-center cursor-pointer py-3 gap-x-2 text-black bg-white rounded-md w-full hover:opacity-80 transition"
            >
              <FcGoogle size={30} />
              <span>Sign in with Google</span>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              First time using Email Findly?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create an Account
              </a>
            </p>
          </form>
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
      );
      {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div> */}
    </>
  );
}
