"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const { session } = useSessionContext();

  const { open } = useAuthModal();

  return (
    <div className="flex flex-col justify-start items-start">
      <h1 className="text-3xl font-black max-w-md">
        Connect with your Doctor easier than ever
      </h1>
      <p className="mt-5 max-w-lg text-sm text-neutral-600">
        Welcome to EasyBook, where the power to manage your health is at your
        fingertips. With our user-friendly platform, connecting with your doctor
        has never been more convenient. Say goodbye to long waiting times and
        endless phone calls – now you can effortlessly schedule appointments,
        receive timely reminders, and even engage in virtual consultations from
        the comfort of your home. Experience healthcare made simple with
        EasyBook, putting you in control of your well-being.
      </p>

      <div className="flex gap-x-5 mt-10">
        <button
          type="button"
          className="bg-blue text-white border border-blue rounded-sm py-2 px-3 hover:bg-white hover:text-blue hover:border-blue"
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
          className="text-blue bg-white border rounded-sm px-3 py-2 border-blue hover:bg-blue hover:text-white hover:border hover:border-white"
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
  );
};

export default Hero;
