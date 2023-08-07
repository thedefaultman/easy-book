"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAuthModal } from "@/hooks/useAuthModal";
import { RxHamburgerMenu } from "react-icons/rx";
import useUserInfo from "@/hooks/useUserInfo";

const Navbar = () => {
  const { open } = useAuthModal();
  const { setLogin } = useUserInfo();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = useMemo(
    () => [
      {
        label: "Login",
        className:
          "bg-white border border-blue text-blue px-4 py-1 rounded-sm hover:bg-blue hover:text-white hover:border hover:border-white",
        onClick: () => {
          open();
          setLogin(true);
        },
      },
      {
        label: "Signup",
        className:
          "bg-blue text-white px-4 py-1 rounded-sm border border-blue hover:bg-white hover:text-blue hover:border-blue",
        onClick: () => {
          open();
          setLogin(false);
        },
      },
    ],
    [open, setLogin]
  );

  return (
    <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <ul className="justify-between items-center gap-x-2 hidden md:flex">
        <li>
          <Link href="/">
            <p className="text-black font-medium">Home</p>
          </Link>
        </li>
        <li>
          <Link href="#reviews">
            <p className="text-black font-medium">About</p>
          </Link>
        </li>
        <li>
          <Link href="#testimonials">
            <p className="text-black font-medium">Testimonials</p>
          </Link>
        </li>
      </ul>

      <div className="flex items-center mr-7">
        <h1 className="text-neutral-900 font-bold text-3xl">EASY BOOK</h1>
      </div>

      <ul className="gap-x-2 hidden md:flex">
        {routes.map(({ label, className, onClick }) => (
          <li key={label} className={className} onClick={onClick}>
            {label}
          </li>
        ))}
      </ul>

      <div className="flex md:hidden">
        <RxHamburgerMenu
          size={30}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />

        {isMenuOpen && (
          <ul className="absolute top-12 right-0 bg-white shadow-md rounded-sm flex flex-col gap-y-2 p-2 z-50 w-full text-center">
            <li onClick={() => setIsMenuOpen(false)}>
              <Link href="/">
                <p className="text-black font-medium">Home</p>
              </Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link href="/about">
                <p className="text-black font-medium">About</p>
              </Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link href="/contact">
                <p className="text-black font-medium">Contact</p>
              </Link>
            </li>
            {routes.map(({ label, className, onClick }) => (
              <li
                key={label}
                className={className}
                onClick={() => {
                  onClick();
                  setIsMenuOpen(false);
                }}
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
