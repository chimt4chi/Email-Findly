import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";
import Head from "next/head";
import { NextPageContext } from "next";

import { FaCloudUploadAlt } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import LinkedinFinder from "@/components/LinkedinFinder";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth?variant=login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

function Index() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    const handleArrowClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const arrowParent = target.parentElement?.parentElement; //selecting main parent of arrow
      if (arrowParent) {
        arrowParent.classList.toggle("showMenu");
      }
    };

    const handleSidebarBtnClick = () => {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar) {
        sidebar.classList.toggle("close");
      }
    };

    const arrow = document.querySelectorAll(".arrow");
    arrow.forEach((item) => {
      item.addEventListener("click", handleArrowClick as EventListener);
    });

    const sidebarBtn = document.querySelector(".bx-menu");
    if (sidebarBtn) {
      sidebarBtn.addEventListener("click", handleSidebarBtnClick);
    }

    return () => {
      // Clean up event listeners
      arrow.forEach((item) => {
        item.removeEventListener("click", handleArrowClick as EventListener);
      });
      if (sidebarBtn) {
        sidebarBtn.removeEventListener("click", handleSidebarBtnClick);
      }
    };
  }, []);

  const { data: user } = useCurrentUser();

  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Bulk Email Extraction</title>
      </Head>
      <div>
        <div className="sidebar close">
          <div
            className="logo-details cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            <i className="bx bxl-c-plus-plus"></i>
            <span className="logo_name">Email Findly</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/dashboard">
                <i className="bx bx-grid-alt"></i>
                <span className="link_name">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/bulkEmail">
                <div className="h-12 flex items-center">
                  <FaCloudUploadAlt className="h-4 min-w-[78px] text-center leading-[50px] text-white text-lg cursor-pointer transition-all duration-300 ease-in-out" />
                  <span className="link_name">Bulk Email</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/emailFinder">
                <div className="h-12 flex items-center">
                  <FaCloudUploadAlt className="h-4 min-w-[78px] text-center leading-[50px] text-white text-lg cursor-pointer transition-all duration-300 ease-in-out" />
                  <span className="link_name">Email Finder</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/bulkLinkedin">
                <div className="h-12 flex items-center">
                  <FaCloudUploadAlt className="h-4 min-w-[78px] text-center leading-[50px] text-white text-lg cursor-pointer transition-all duration-300 ease-in-out" />
                  <span className="link_name">Bulk Linkedin</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/linkedinFinder">
                <div className="h-12 flex items-center">
                  <FaCloudUploadAlt className="h-4 min-w-[78px] text-center leading-[50px] text-white text-lg cursor-pointer transition-all duration-300 ease-in-out" />
                  <span className="link_name">Linkedin Finder</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="#">
                <div className="h-12 flex items-center">
                  <VscVerifiedFilled className="h-6 min-w-[78px] text-center leading-[50px] text-white text-lg cursor-pointer transition-all duration-300 ease-in-out" />
                  <span className="link_name">Email Verifier</span>
                </div>
              </Link>
            </li>
            <li>
              <div className="profile-details">
                <div className="profile-content">
                  <img
                    src={
                      user?.image
                        ? user.image
                        : "https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
                    }
                    alt="profileImg"
                  />
                </div>
                <div className="name-job">
                  <div className="profile_name">{user?.name}</div>
                  {/* <div className="job">Web Dev</div> */}
                </div>
                <i className="bx bx-log-out" onClick={() => signOut()}></i>
              </div>
            </li>
          </ul>
        </div>
        <section className="home-section">
          <div className="home-content flex justify-between">
            <i className="bx bx-menu z-50"></i>
            {/* <h1 className="flex justify-end lg:text-4xl text-sm font-semibold text-indigo-600">
              Email Findly
            </h1> */}
            <div className="profile-details flex relative items-center  mr-2.5">
              <div
                className="profile-content relative mr-1 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  className="lg:h-10 lg:w-10 h-5 w-5 rounded-full"
                  src={
                    user?.image
                      ? user.image
                      : "https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
                  }
                  alt="profileImg"
                />
              </div>
              {/* <i
                className="bx bx-chevron-down dropdown-icon cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              ></i> */}
              {dropdownOpen && (
                <div className="dropdown-content absolute right-0 mt-40 w-36 bg-white rounded shadow-md py-1">
                  <div className="additional-info px-4 py-2 flex items-center justify-center flex-col">
                    <div className="profile_name">{user?.name}</div>
                    {/* <div className="job text-gray-600">Web Dev</div> */}
                    <i
                      className="bx bx-log-out hover:text-red-500 px-4 py-2 cursor-pointer "
                      onClick={() => signOut()}
                    ></i>
                  </div>
                </div>
              )}
            </div>
          </div>

          {router.pathname !== "/dashboard/upload" && <LinkedinFinder />}
        </section>
      </div>
    </div>
  );
}

export default Index;
