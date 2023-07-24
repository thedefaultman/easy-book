"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useAuthModal } from "@/hooks/useAuthModal";

const Navbar = () => {
  const { open } = useAuthModal();

  const routes = useMemo(
    () => [
      {
        label: "Login",
        className:
          "bg-white border border-blue text-blue px-2 py-1 rounded-sm hover:bg-blue hover:text-white hover:border hover:border-white",
        onClick: open,
      },
      {
        label: "Signup",
        className:
          "bg-blue text-white px-2 py-1 rounded-sm border border-blue hover:bg-white hover:text-blue hover:border-blue",
        onClick: open,
      },
    ],
    [open]
  );

  return (
    <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <ul className="flex justify-between items-center gap-x-2">
        <li>
          <Link href="/">
            <p className="text-black">Home</p>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <p className="text-black">About</p>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <p className="text-black">Contact</p>
          </Link>
        </li>
      </ul>

      <div className="flex items-center mr-7">
        <h1 className="text-neutral-500">Landing page</h1>
      </div>

      <ul className="flex gap-x-2">
        {routes.map(({ label, className, onClick }) => (
          <li key={label} className={className} onClick={onClick}>
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
