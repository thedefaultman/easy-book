"use client";
import { useEffect, useState } from "react";
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
  }, [session?.user.id, supabase]);

  return (
    <Sidebar>
      {isLoadingUser && (
        <div className="flex justify-center items-center relative mx-auto w-full h-full">
          <PulseLoader color="#0F62FE" />
        </div>
      )}

      {userDetails && userType === "patient" && <PatientDashboard />}
      {userDetails && userType === "doctor" && <DoctorDashboard />}
    </Sidebar>
  );
};

export default Dashboard;
