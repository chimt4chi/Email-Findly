import React from "react";

interface SidebarProps {
  children: any;
  showSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ children, showSidebar }) => {
  if (!showSidebar) {
    return null;
  }

  return (
    <>
      <div>Sidebar</div>
      <div>{children}</div>
    </>
  );
};

export default Sidebar;
