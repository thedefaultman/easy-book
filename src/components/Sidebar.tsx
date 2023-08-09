"use client";

import React, { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import DashboardNav from "./DashboardNav";
import { useSection } from "@/hooks/useSection";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { activeSection, setSection } = useSection();

  const routes = useMemo(
    () => [
      {
        name: "Overview",
        icon: HiHome,
        active: activeSection === "Overview",
      },
      {
        name: "My History",
        icon: CgProfile,
        active: activeSection === "My History",
      },
    ],
    [activeSection]
  );

  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-white h-full w-[300px] p-2 text-black">
        <Box>
          <h1 className="text-black font-medium text-xl text-center bg-slate-100 p-2 rounded-lg">
            EasyBook
          </h1>
          <div className="flex justify-center items-center">
            {routes.map((route) => (
              <SidebarItem key={route.name} {...route} />
            ))}
          </div>
        </Box>

        <Box className="h-full">
          <DashboardNav />
        </Box>
      </div>

      <main className="h-full flex-1 overflow-y-auto py-2 bg-slate-100">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
