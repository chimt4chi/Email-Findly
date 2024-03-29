import React, { useState } from "react";
import { useRouter } from "next/router";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";

interface HeaderProps {
  showHeader: boolean;
}

const Header: React.FC<HeaderProps> = ({ showHeader }) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State to track whether mobile menu is open

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleDropdownItemClick = (path: string) => {
    router.push(path);
    setDropdownOpen(false);
  };

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  const handleNavigate = (variant: string) => {
    router.push({
      pathname: "/auth",
      query: { variant },
    });
  };

  if (!showHeader) {
    return null;
  }

  return (
    <div className="my-6 mx-12 py-4 rounded-full    bg-gradient-to-t from-purple-500/30 to-pink-500/20">
      <div className="container mx-auto flex items-center justify-between px-10 flex-wrap">
        <div className="flex items-center flex-wrap ">
          <div className="flex items-center mr-4 text-gray-600 hover:bg-purple-500/30 focus:bg-purple-600/30 focus:rounded-full hover:rounded-full">
            <button
              onClick={() => router.push("/")}
              className="  font-semibold px-4 py-2  focus:outline-none focus:bg-purple-600/30 focus:rounded-full"
            >
              Email Findly
            </button>
          </div>
          <div className="hidden lg:flex flex-wrap">
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
        </div>
        <div className="hidden lg:flex flex-wrap">
          <button
            onClick={() => handleNavigate("register")}
            className="text-gray-800 font-semibold px-4 py-2 rounded focus:outline-none hover:rounded-full   hover:bg-purple-500/30 focus:bg-purple-600/30 focus:rounded-full mr-4"
          >
            Create an account
          </button>
          <button
            onClick={() => handleNavigate("login")}
            className="text-gray-800 font-semibold px-4 py-2 rounded focus:outline-none hover:rounded-full hover:bg-purple-500/30 focus:bg-purple-600/30 focus:rounded-full "
          >
            Log in
          </button>
        </div>
        {/* Mobile menu icon */}
        <div
          onClick={toggleMobileMenu}
          className="flex lg:hidden text-gray-600 cursor-pointer mx-4 items-center justify-center"
        >
          <IoMenu size={25} />
        </div>
        {/* Mobile menu content */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full mt-4 flex flex-col items-center">
            {router.pathname !== "/auth" && (
              <button
                onClick={() => router.push("/pricing")}
                className="px-4 py-2 focus:outline-none focus:bg-purple-600/30 rounded-full hover:rounded-full mt-2"
              >
                Pricing
              </button>
            )}
            {router.pathname !== "/auth" && (
              <div className="relative mt-2">
                <div
                  className="flex items-center text-gray-600 hover:bg-purple-500/30 focus:bg-purple-600/30 focus:rounded-full hover:rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <button className="px-4 py-2   focus:outline-none">
                    Product
                  </button>
                  <RiArrowDropDownLine size={30} />
                </div>
                {dropdownOpen && (
                  <div className="absolute bg-purple-500/30 rounded-md shadow mt-2 w-full">
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
            <button
              onClick={() => router.push("/auth")}
              className="text-gray-800 font-semibold px-4 py-2 rounded focus:outline-none hover:rounded-full   hover:bg-purple-500/30 focus:bg-purple-600/30 focus:rounded-full mb-2"
            >
              Create an account
            </button>
            <button
              onClick={() => router.push("/auth")}
              className="text-gray-800 font-semibold px-4 py-2 rounded focus:outline-none hover:rounded-full hover:bg-purple-500/30 focus:bg-purple-600/30 focus:rounded-full "
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
