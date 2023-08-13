"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const { session } = useSessionContext();

  const { open } = useAuthModal();

  return (
    <div className="flex justify-center md:justify-between items-center px-6 sm:px-16 max-w-7xl py-12 2xl:py-16 relative mx-auto gap-x-6">
      <div className="md:hidden top-0 absolute h-[150px] w-[150px]">
        <Image
          src="/landing.svg"
          height={400}
          width={400}
          className="object-cover image-pattern"
          alt="image of a female doctor"
        />
      </div>

      <div className="flex flex-col justify-center items-center text-center md:justify-start md:items-start md:text-start">
        <h1 className="text-2xl md:text-5xl 2xl:text-7xl font-bold max-w-xl 2xl:max-w-md text-white">
          Connect with your Doctor easier than ever
        </h1>
        <p className="mt-5 max-w-lg text-sm font-medium text-white">
          Welcome to EasyBook, where the power to manage your health is at your
          fingertips. With our user-friendly platform, connecting with your
          doctor has never been more convenient. Say goodbye to long waiting
          times and endless phone calls – now you can effortlessly schedule
          appointments, receive timely reminders, and even engage in virtual
          consultations from the comfort of your home. Experience healthcare
          made simple with EasyBook, putting you in control of your well-being.
        </p>

        <div className="flex gap-x-5 mt-10">
          <button
            type="button"
            className="bg-blue font-medium text-white border border-blue rounded-sm py-2 px-3 hover:bg-white hover:text-blue hover:border-blue"
            onClick={() => {
              if (session) {
                router.push("/dashboard");
              } else {
                open();
              }
            }}
          >
            Dashboard
          </button>
          <button
            className="text-blue font-medium bg-white border rounded-sm px-3 py-2 border-blue hover:bg-blue hover:text-white hover:border hover:border-white"
            onClick={() => {
              if (session) {
                router.push("/dashboard");
              } else {
                open();
              }
            }}
          >
            Book an appointment
          </button>
        </div>
      </div>

      <div className="hidden md:block">
        <Image
          src="/landing.svg"
          height={400}
          width={400}
          className="object-cover image-pattern"
          alt="image of a female doctor"
        />
      </div>
    </div>
  );
};

export default Hero;
