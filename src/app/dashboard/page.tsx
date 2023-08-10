"use client";
import { useEffect, useMemo, useState } from "react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useSessionContext } from "@supabase/auth-helpers-react";
import PatientDashboard from "@/components/PatientDashboard";
import DoctorDashboard from "@/components/DoctorDashboard";
import { PulseLoader } from "react-spinners";

export const revalidate = 0;

const Dashboard = () => {
  const { isLoading: isLoadingUser, session } = useSessionContext();

  const [userType, setUserType] = useState<"patient" | "doctor" | null>(null);

  useMemo(() => {
    if (!session && !isLoadingUser) {
      redirect("/");
    }
  }, [isLoadingUser, session]);

  useEffect(() => {
    if (session?.user.user_metadata.user_role === "Patient") {
      setUserType("patient");
    } else if (session?.user.user_metadata.user_role === "Doctor") {
      setUserType("doctor");
    }

    return () => {
      setUserType(null);
    };
  }, [session?.user.user_metadata.user_role]);

  return (
    <>
      {isLoadingUser && (
        <div className="flex justify-center items-center relative mx-auto w-full h-full">
          <PulseLoader color="#0F62FE" />
        </div>
      )}
      {session && !isLoadingUser ? (
        <Sidebar>
          {userType === "patient" && <PatientDashboard />}
          {userType === "doctor" && <DoctorDashboard />}
        </Sidebar>
      ) : (
        <h1 className="flex items-center justify-center h-full w-full text-blue font-bold">
          Access Unauthorized
        </h1>
      )}
    </>
  );
};

export default Dashboard;
