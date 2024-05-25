"use client";
import React, { useEffect, useState } from "react";
import "./style.module.css";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import BulkUpload from "./BulkUpload";
import Link from "next/link";

const Sidebar2 = () => {
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
      <div className="sidebar close">
        <div
          className="logo-details cursor-pointer"
          onClick={() => router.push("/")}
        >
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">Email Findly</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link href="#">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" href="#">
                  Category
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="#">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" href="#">
                  Category
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="#">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" href="#">
                  Category
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="#">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" href="#">
                  Category
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <Link href="#">
                <i className="bx bx-collection"></i>
                <span className="link_name">Category</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" href="#">
                  Products
                </Link>
              </li>

              <li>
                <Link href="/dashboard/bulkEmail">Bulk Email Upload</Link>
              </li>
              <li>
                <Link href="/dashboard/bulkLinkedin">Bulk Linkedin Upload</Link>
              </li>
              <li>
                <Link href="#">Email Verifier (coming soon)</Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content">
                <img src={user?.image} alt="profileImg" />
              </div>
              <div className="name-job">
                <div className="profile_name">{user?.name}</div>
                <div className="job">Web Dev</div>
              </div>
              <i className="bx bx-log-out" onClick={() => signOut()}></i>
            </div>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <div className="home-content flex justify-between">
          <i className="bx bx-menu "></i>
          <h1 className="flex justify-end text-4xl font-semibold text-indigo-600">
            Email Findly
          </h1>
          <div className="profile-details flex relative items-center">
            <div className="profile-content relative mr-4">
              <img
                className="h-10 w-10 rounded-full"
                src={user?.image}
                alt="profileImg"
              />
            </div>
            <i
              className="bx bx-chevron-down dropdown-icon cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            ></i>
            {dropdownOpen && (
              <div className="dropdown-content absolute right-0 mt-40 w-36 bg-white rounded shadow-md py-1">
                <div className="additional-info px-4 py-2 flex items-center justify-center flex-col">
                  <div className="profile_name">{user?.name}</div>
                  <div className="job text-gray-600">Web Dev</div>
                  <i
                    className="bx bx-log-out hover:text-red-500 px-4 py-2 cursor-pointer "
                    onClick={() => signOut()}
                  ></i>
                </div>
              </div>
            )}
          </div>
        </div>
        {router.pathname !== "/dashboard/emailFinder" && <BulkUpload />}
      </section>
      {/* <h1>hello</h1> */}
      {/* <div className="one"></div> */}
    </div>
  );
};

export default Sidebar2;
