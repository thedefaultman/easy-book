"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Doctor, Patient } from "@/lib/types/types";
import PatientDashboard from "@/components/PatientDashboard";
import DoctorDashboard from "@/components/DoctorDashboard";
import { PulseLoader } from "react-spinners";

const Dashboard = () => {
  const {
    isLoading: isLoadingUser,
    supabaseClient: supabase,
    session,
  } = useSessionContext();

  const [userDetails, setUserDetails] = useState<Patient | Doctor | null>(null);
  const [userType, setUserType] = useState<"patient" | "doctor" | null>(null);

  useEffect(() => {
    if (!session) {
      redirect("/");
    }

    const getUserDetails = async () => {
      try {
        const { data: patientData, error: patientError } = await supabase
          .from("patient")
          .select("*")
          .eq("user_id", session?.user.id)
          .single();

        const { data: doctorData, error: doctorError } = await supabase
          .from("doctor")
          .select("*")
          .eq("user_id", session?.user.id)
          .single();

        if (patientData) {
          setUserDetails(patientData);
          setUserType("patient");
        }
        if (doctorData) {
          setUserDetails(doctorData);
          setUserType("doctor");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserDetails();
  }, [session, session?.user.id, supabase]);

  return (
    <>
      {session && !isLoadingUser ? (
        <Sidebar>
          {isLoadingUser && (
            <div className="flex justify-center items-center relative mx-auto w-full h-full">
              <PulseLoader color="#0F62FE" />
            </div>
          )}

          {userDetails && userType === "patient" && <PatientDashboard />}
          {userDetails && userType === "doctor" && <DoctorDashboard />}
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
