import React from "react";
import Link from "next/link";

interface UserDashboardProps {
  currentUser: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ currentUser }) => {
  const sidebarItems = [
    { label: "Dashboard", href: "/" },
    { label: "Team", href: "/team" },
    { label: "Projects", href: "/projects" },
    { label: "Calendar", href: "/calendar" },
    { label: "Documents", href: "/documents" },
    { label: "Reports", href: "/reports" },
    { label: "Heroicons", href: "/heroicons" },
    { label: "Tailwind Labs", href: "/tailwind-labs" },
    { label: "Workcation", href: "/workcation" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <div className="bg-slate-800 text-white h-screen p-4 flex flex-col ">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-md bg-blue-700 text-white px-4 py-2"
        />
      </div>
      <div className="flex-grow">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="mt-auto text-center">
        <span>{currentUser}</span>
      </div>
    </div>
  );
};

export default UserDashboard;
