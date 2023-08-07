"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import DashboardNav from "./DashboardNav";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        active: pathname === "/dashboard",
        href: "/dashboard",
      },
      {
        icon: CgProfile,
        active: pathname === "/dashboard/profile",
        href: "/dashboard/profile",
      },
    ],
    [pathname]
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
              <SidebarItem key={route.href} {...route} />
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
