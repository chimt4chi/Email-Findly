import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Tab, Tabs } from "@mui/material";
import Typewriter from "typewriter-effect";

function Hero() {
  const [selectedTab, setSelectedTab] = useState(0); // State for selected tab index

  const [data, setData] = useState([] as any[]);

  const [inputData, setInputData] = useState("");
  const router = useRouter();

  const updateIsShow = (event: React.ChangeEvent<{}>, value: number) => {
    setSelectedTab(value); // Update selected tab index
  };

  const handleClick = async () => {
    // fetch("https://fakestoreapi.com/products")
    //   .then((res) => res.json())
    //   .then((json) => setData(json))
    //   .catch((error) => console.error("Error:", error));
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      const data = await response.json();
      console.log(inputData);

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Email Finder | Home</title>
      </Head>
      <div className="h-screen text-black">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="grad-circle"></div>

          <div className="mt-10 sm:mt-20 text-center">
            <h1 className="text-4xl sm:text-6xl">Email Finder</h1>
            <h3 className="text-4xl sm:text-6xl text-purple-800">
              Find the verified email address{" "}
            </h3>
            <h3 className="text-4xl sm:text-6xl">
              <Typewriter
                options={{
                  strings: "of any professional",
                  autoStart: true,
                  loop: true,
                }}
              />
            </h3>
          </div>
          <div className="mt-10 sm:mt-20 w-full max-w-md">
            <Tabs
              value={selectedTab} // Set selected tab index
              onChange={updateIsShow}
              centered
              textColor="secondary"
            >
              <Tab label="Email by URL" style={{ fontWeight: "bold" }} />
              <Tab label="Email verifier" style={{ fontWeight: "bold" }} />
              {/* <Tab label="Website url" style={{ fontWeight: "bold" }} /> */}
            </Tabs>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row justify-center items-center w-full max-w-md">
            <input
              type="text"
              onChange={(e) => setInputData(e.target.value)}
              value={inputData}
              className="form-input mt-4 sm:mt-0 mb-4 sm:mb-0 mr-0 sm:mr-2 py-2 px-4 rounded-lg border border-gray-300 w-full"
              placeholder={selectedTab === 0 ? "Enter URL" : "Enter Email"} // Change placeholder based on selected tab index
            />
            <button
              onClick={handleClick}
              className="py-2 px-4 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold"
            >
              Find
            </button>
          </div>

          {/* {data.map(item => (
            <p>{item.title}</p>
          ))} */}

          <div className="overflow-x-auto mt-5 max-w-full">
            {data.map((item, index) => (
              <div key={item.id} className="p-2">
                <p>
                  {index + 1} {item.title}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">Trusted by leading companies</div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

// import React, { useState } from "react";
// import Head from "next/head";
// import { useRouter } from "next/router";
// import { Tab, Tabs } from "@mui/material";
// import Typewriter from "typewriter-effect";

// function Hero() {
//   const tabLabels = ["Find email by URL", "Email verifier", "Website url"];
//   const [selectedTab, setSelectedTab] = useState(0); // State for selected tab index
//   const [placeholderText, setPlaceholderText] = useState<string>("Enter URL");

//   const updateIsShow = (event: React.ChangeEvent<{}>, value: number) => {
//     setSelectedTab(value);
//     setPlaceholderText(
//       value === 0
//         ? "Enter URL"
//         : value === 1
//         ? "Enter Email"
//         : "Enter Website URL"
//     );
//   };

//   return (
//     <div>
//       <Head>
//         <title>Email Finder | Home</title>
//       </Head>
//       <div className="h-screen text-black">
//         <div className="flex flex-col items-center justify-center h-full">
//           <div className="grad-circle"></div>

//           <div className="mt-10 sm:mt-20 text-center">
//             <h1 className="text-4xl sm:text-6xl">Email Finder</h1>
//             <h3 className="text-4xl sm:text-6xl text-purple-800">
//               Find the verified email address{" "}
//             </h3>
//             <h3 className="text-4xl sm:text-6xl">
//               <Typewriter
//                 options={{
//                   strings: "of any professional",
//                   autoStart: true,
//                   loop: true,
//                 }}
//               />
//             </h3>
//           </div>
//           <div className="mt-10 sm:mt-20 w-full max-w-md">
//             <Tabs
//               value={selectedTab} // Set selected tab index
//               onChange={updateIsShow}
//               centered
//               textColor="secondary"
//             >
//               {tabLabels.map((label, index) => (
//                 <Tab
//                   key={index}
//                   style={{
//                     color: "black",
//                     fontWeight: "bold",
//                   }}
//                   label={label}
//                 />
//               ))}
//               {/* <Tab label="Email by URL" style={{ fontWeight: "bold" }} />
//               <Tab label="Email verifier" style={{ fontWeight: "bold" }} /> */}
//               {/* <Tab label="Website url" style={{ fontWeight: "bold" }} /> */}
//             </Tabs>
//           </div>

//           <div className="mt-5 flex flex-col sm:flex-row justify-center items-center w-full max-w-md">
//             <input
//               type="text"
//               className="form-input mt-4 sm:mt-0 mb-4 sm:mb-0 mr-0 sm:mr-2 py-2 px-4 rounded-lg border border-gray-300 w-full"
//               // placeholder={selectedTab === 0 ? "Enter URL" : "Enter Email"} // Change placeholder based on selected tab index
//               placeholder={placeholderText}
//             />
//             <button className="py-2 px-4 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-800 hover:to-pink-600 text-white font-bold">
//               Find
//             </button>
//           </div>

//           <div className="mt-10 text-center">Trusted by leading companies</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero;
