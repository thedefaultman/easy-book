"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAuthModal } from "@/hooks/useAuthModal";
import { RxHamburgerMenu } from "react-icons/rx";
import useUserInfo from "@/hooks/useUserInfo";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { open } = useAuthModal();
  const { setLogin } = useUserInfo();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  const { session } = useSessionContext();

  useMemo(() => {
    if (session) {
      setHasSession(true);
    }
  }, [session]);

  const routes = useMemo(
    () => [
      {
        label: "Login",
        className:
          "bg-white border border-blue text-blue px-4 py-1 rounded-sm hover:bg-blue hover:text-white hover:border hover:border-white font-medium",
        onClick: () => {
          if (hasSession) return toast.error("You are already logged in");
          open();
          setLogin(true);
        },
      },
      {
        label: "Signup",
        className:
          "bg-blue text-white px-4 py-1 rounded-sm border border-blue hover:bg-white hover:text-blue hover:border-blue font-medium",
        onClick: () => {
          if (hasSession) return toast.error("You are already logged in");
          open();
          setLogin(false);
        },
      },
    ],
    [open, setLogin, hasSession]
  );

  return (
    <nav className="max-w-7xl flex items-center justify-between mx-auto py-8">
      <div className="flex items-center mr-7">
        <h1 className="text-white font-bold text-3xl">EasyBook</h1>
      </div>

      <ul className="justify-between items-center gap-x-2 hidden md:flex">
        <li>
          <Link href="/">
            <p className="text-white font-medium hover:border-b-white hover:border-b">
              Home
            </p>
          </Link>
        </li>
        <li>
          <Link href="#reviews">
            <p className="text-white font-medium hover:border-b-white hover:border-b">
              About
            </p>
          </Link>
        </li>
        <li>
          <Link href="#testimonials">
            <p className="text-white font-medium hover:border-b-white hover:border-b">
              Testimonials
            </p>
          </Link>
        </li>
      </ul>

      <div className="gap-x-2 hidden md:flex">
        {routes.map(({ label, className, onClick }) => (
          <button key={label} className={className} onClick={onClick}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex md:hidden">
        <RxHamburgerMenu
          size={30}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />

        {isMenuOpen && (
          <ul className="absolute top-16 right-0 bg-white shadow-md rounded-sm flex flex-col gap-y-2 p-2 z-50 w-1/2 text-center">
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
              <button
                key={label}
                className={className}
                onClick={() => {
                  onClick();
                  setIsMenuOpen(false);
                }}
              >
                {label}
              </button>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
