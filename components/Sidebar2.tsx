"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./style.module.css";

// Define the type for the menuStates object
type MenuStates = {
  [key: number]: boolean; // Index signature
};

// interface FooterProps {
//   showHeader: boolean;
// }

// const Sidebar2: React.FC<FooterProps> = ({ showHeader }) => {
//   if (!showHeader) {
//     return null;
//   }

const Sidebar2 = () => {
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
  return (
    <div>
      <div className="sidebar close">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">Email Findly</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Category
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-collection"></i>
                <span className="link_name">Category</span>
              </a>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Category
                </a>
              </li>
              <li>
                <a href="#">HTML & CSS</a>
              </li>
              <li>
                <a href="#">JavaScript</a>
              </li>
              <li>
                <a href="#">PHP & MySQL</a>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-book-alt"></i>
                <span className="link_name">Posts</span>
              </a>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Posts
                </a>
              </li>
              <li>
                <a href="#">Web Design</a>
              </li>
              <li>
                <a href="#">Login Form</a>
              </li>
              <li>
                <a href="#">Card Design</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="link_name">Analytics</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Analytics
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-line-chart"></i>
              <span className="link_name">Chart</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Chart
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-plug"></i>
                <span className="link_name">Plugins</span>
              </a>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Plugins
                </a>
              </li>
              <li>
                <a href="#">UI Face</a>
              </li>
              <li>
                <a href="#">Pigments</a>
              </li>
              <li>
                <a href="#">Box Icons</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-compass"></i>
              <span className="link_name">Explore</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Explore
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-history"></i>
              <span className="link_name">History</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  History
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="link_name">Setting</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Setting
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content">
                {/* <!--<img src="image/profile.jpg" alt="profileImg">--> */}
              </div>
              <div className="name-job">
                <div className="profile_name">Rohit Singh</div>
                <div className="job">Web Dev</div>
              </div>
              <i className="bx bx-log-out"></i>
            </div>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <div className="home-content">
          <i className="bx bx-menu"></i>
          {/* <span className="text">Drop Down Sidebar</span> */}
        </div>
      </section>

      {/* <div className="one"></div> */}
    </div>
  );
};

export default Sidebar2;
