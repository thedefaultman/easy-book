"use client";

import React, { useMemo, useState } from "react";
import { HiHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { useSessionContext } from "@supabase/auth-helpers-react";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import DashboardNav from "./DashboardNav";
import { useSection } from "@/hooks/useSection";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { activeSection, setSection } = useSection();
  const { session, supabaseClient: supabase } = useSessionContext();
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px] p-2 text-black">
        <Box>
          <h1 className="text-black font-bold text-3xl text-center p-2 rounded-lg">
            EasyBook
          </h1>
          <div className="flex justify-center items-center">
            {routes.map((route) => (
              <SidebarItem key={route.name} {...route} />
            ))}
            <span
              onClick={() => {
                setMenuOpen(true);
                setSection(activeSection.toString());
              }}
            >
              <SidebarItem name="Settings" icon={IoSettingsOutline} />
            </span>

            {menuOpen && (
              <div className="absolute left-0 top-0 bg-black bg-opacity-50 flex justify-center items-center w-full h-full text-center z-50">
                <div className="bg-blue rounded-lg p-4">
                  <h1 className="text-2xl font-bold text-center text-white">
                    Settings
                  </h1>
                  <div className="flex flex-col gap-y-2 mt-4">
                    <span
                      className="text-white text-xl cursor-pointer"
                      onClick={() => {
                        setMenuOpen(false);
                        supabase.auth.signOut();
                      }}
                    >
                      Logout
                    </span>
                    <span
                      className="text-white text-xl cursor-pointer"
                      onClick={() => setMenuOpen(false)}
                    >
                      Close
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Box>

        <Box className="h-full">
          <DashboardNav />
        </Box>
      </div>

      <main className="h-full flex-1 overflow-y-auto flex flex-col gap-y-2 p-2">
        <Box className="h-full">{children}</Box>
      </main>
    </div>
  );
};

export default Sidebar;
