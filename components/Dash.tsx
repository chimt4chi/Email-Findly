import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

// Icons

import { FaMoon, FaSun, FaUser, FaCloudUploadAlt } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";
import { AiOutlineDropbox, AiOutlineUser } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";

interface DashboardProps {
  title: string;
}

const Dash: React.FC<DashboardProps> = ({ title }) => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true); // Initially open on big screens
  const [showUserOptions, setShowUserOptions] = useState(false);

  const { data: user } = useCurrentUser();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleSidebar = () => {
    setShowSidebar((prevShow) => !prevShow);
  };

  const toggleUserOptions = () => {
    setShowUserOptions((prevShow) => !prevShow);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <Drawer
        className={`flex h-screen ${darkMode ? "dark" : ""}`}
        open={showSidebar}
        onClose={toggleSidebar}
      >
        <List className="flex flex-col gap-6">
          <ListItem
            className="cursor-pointer active:bg-gray-900"
            onClick={() => router.push("/dashboard/emailFinder")}
          >
            <ListItemIcon>
              <FaUser />
            </ListItemIcon>
            <ListItemText primary="Find Email" />
          </ListItem>
          <ListItem
            className="cursor-pointer active:bg-gray-900"
            onClick={() => router.push("/dashboard/upload")}
          >
            <ListItemIcon>
              <FaCloudUploadAlt />
            </ListItemIcon>
            <ListItemText primary="Upload" />
          </ListItem>
          <ListItem className="cursor-pointer">
            <ListItemIcon>
              <FaUser />
            </ListItemIcon>
            <ListItemText primary={user?.name} />
          </ListItem>
        </List>
      </Drawer>
      <div className="flex flex-col flex-1">
        <div className="bg-gray-800 text-white py-8">
          <div className="container mx-auto flex justify-between items-center">
            <button onClick={toggleSidebar}>
              <IoMenu size={30} />
            </button>
            <Link
              href={"/dashboard"}
              className="text-xl font-bold cursor-pointer"
            >
              Dashboard
            </Link>
            <div className=" rounded-full flex items-center">
              <div className="flex items-center flex-row gap-4">
                <div className="flex items-center hover:bg-gray-500 rounded-full h-10 w-10 justify-center">
                  {darkMode ? (
                    <button onClick={toggleDarkMode}>
                      <FaSun size={20} />
                    </button>
                  ) : (
                    <button onClick={toggleDarkMode}>
                      <FaMoon size={20} />
                    </button>
                  )}
                </div>
                <div
                  className="cursor-pointer flex items-center rounded-full"
                  onClick={toggleUserOptions}
                >
                  {user?.image ? (
                    <img
                      className="hover:bg-gray-500 h-8 w-8 rounded-full"
                      src={user?.image}
                      alt=""
                    />
                  ) : (
                    <div className="hover:bg-gray-500 rounded-full h-10 w-10 flex items-center justify-center">
                      <AiOutlineUser size={25} />
                    </div>
                  )}
                  <div className="rounded-full hover:bg-gray-500">
                    <RiArrowDropDownLine size={25} />
                  </div>
                </div>
                {showUserOptions && (
                  <div className="absolute top-24 right-20 mt-2 w-48 text-black bg-gray-500 rounded-md shadow-xl z-10">
                    <List>
                      <ListItem className="cursor-pointer rounded-md hover:bg-gray-600">
                        <ListItemIcon>
                          {user?.image ? (
                            <img
                              className="hover:bg-gray-500 h-8 w-8 rounded-full"
                              src={user?.image}
                              alt=""
                            />
                          ) : (
                            <div className=" h-10 w-10 flex items-center justify-center">
                              <AiOutlineUser size={25} />
                            </div>
                          )}
                        </ListItemIcon>
                        <ListItemText primary={user?.name} />
                      </ListItem>
                      <ListItem
                        className="cursor-pointer  hover:bg-red-800 rounded-md"
                        onClick={handleSignOut}
                      >
                        <ListItemIcon>
                          <div className="h-10 w-10 flex items-center justify-center">
                            <PiSignOut size={25} />
                          </div>
                        </ListItemIcon>
                        <ListItemText primary="Sign Out" />
                      </ListItem>
                    </List>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dash;
