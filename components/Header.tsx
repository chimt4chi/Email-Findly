import React, { useState } from "react";
import { useRouter } from "next/router";
import { RiArrowDropDownLine } from "react-icons/ri";

interface HeaderProps {
  showHeader: boolean;
}

const Header: React.FC<HeaderProps> = ({ showHeader }) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleDropdownItemClick = (path: string) => {
    router.push(path);
    setDropdownOpen(false);
  };

  if (!showHeader) {
    return null;
  }

  return (
    <div className="my-6 mx-12 py-4 rounded-full  bg-gradient-to-t from-purple-500/30 to-pink-500/20">
      <div className="mx-auto flex items-center justify-between px-10 flex-wrap">
        <div className="flex items-center flex-wrap ">
          <div className="flex items-center mr-4 text-gray-600 hover:bg-purple-500/30 focus:bg-purple-600/30 focus:rounded-full hover:rounded-full">
            <button
              onClick={() => router.push("/")}
              className="  font-semibold px-4 py-2  focus:outline-none focus:bg-purple-600/30 focus:rounded-full"
            >
              Email Findly
            </button>
          </div>
          {router.pathname !== "/auth" && (
            <div className="relative hover:rounded-full">
              <div
                className="flex items-center mr-4 text-gray-600 hover:bg-purple-500/30 focus:bg-purple-600/30 focus:rounded-full hover:rounded-full cursor-pointer"
                onClick={toggleDropdown}
              >
                <button className="px-4 py-2   focus:outline-none">
                  Product
                </button>
                <RiArrowDropDownLine size={30} />
              </div>
              {dropdownOpen && (
                <div className="absolute bg-purple-500/30 rounded-md shadow mt-4 w-48">
                  <button
                    onClick={() =>
                      handleDropdownItemClick("/product/category1")
                    }
                    className="block px-4 py-2 text-gray-800 hover:bg-purple-500/30 hover:rounded-md w-full text-left"
                  >
                    Category 1
                  </button>
                  <button
                    onClick={() =>
                      handleDropdownItemClick("/product/category2")
                    }
                    className="block px-4 py-2 text-gray-800 hover:bg-purple-500/30 hover:rounded-md w-full text-left"
                  >
                    Category 2
                  </button>
                </div>
              )}
            </div>
          )}
          {router.pathname !== "/auth" && (
            <div className="text-gray-600 hover:bg-purple-500/30 focus:bg-purple-600/30 focus:rounded-full mr-2 text-md hover:rounded-full focus:outline-none">
              <button
                onClick={() => router.push("/pricing")}
                className="px-4 py-2 focus:outline-none focus:bg-purple-600/30 rounded-full hover:rounded-full"
              >
                Pricing
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap">
          <button
            onClick={() => router.push("/auth")}
            className="text-gray-800 font-semibold px-4 py-2 rounded focus:outline-none focus:bg-purple-600/30 focus:rounded-full hover:underline hover:underline-offset-8"
          >
            Create an account
          </button>
          <button
            onClick={() => router.push("/auth")}
            className="text-gray-800 font-semibold px-4 py-2 rounded focus:outline-none focus:bg-purple-600/30 focus:rounded-full hover:underline underline-offset-8"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
