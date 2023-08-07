"use client";

import SidebarItem from "./SidebarItem";
import { BsHouseAdd, BsFiletypeDoc } from "react-icons/bs";

const DashboardNav = () => {
  const links = [
    {
      label: "Eleven",
      href: "/eleven",
      icon: BsHouseAdd,
    },
    {
      label: "Twelve",
      href: "/twelve",
      icon: BsFiletypeDoc,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-4">
        <div className="inline-flex items-center gap-x-2">search</div>
      </div>

      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {links.map((link) => (
          <SidebarItem key={link.label} {...link} icon={link.icon} />
        ))}
      </div>
    </div>
  );
};

export default DashboardNav;
