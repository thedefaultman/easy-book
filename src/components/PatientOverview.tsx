import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import UpcomingAppointments from "./UpcomingAppointments";
import { useSessionContext } from "@supabase/auth-helpers-react";

const PatientOverview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [doctorVisits, setDoctorVisits] = useState(null);

  const { session } = useSessionContext();

  useEffect(() => {
    const getDoctorVisits = async () => {
      setIsLoading(true);
      const response = await fetch("/api/getDoctorVisits");
      const data = await response.json();
      setDoctorVisits(data);
      setIsLoading(false);
    };

    getDoctorVisits();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="flex justify-center items-center relative mx-auto w-full h-full">
            <PulseLoader color="#0F62FE" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-4 w-full">
          <div className="flex justify-center items-center gap-x-8 mb-2">
            <div className="bg-white w-full py-6 px-2 font-medium text-md text-neutral-500">
              <h1>Total Doctor Visits</h1>
              <p className="font-medium text-lg text-black">{doctorVisits}</p>
            </div>
            <div className="bg-white w-full py-6 px-2 font-medium text-md text-neutral-500">
              <h1>Records</h1>
              <p className="font-medium text-lg text-black">{doctorVisits}</p>
            </div>
          </div>
          <UpcomingAppointments id={session?.user.user_metadata.user_id} />
        </div>
      )}
    </>
  );
};

export default PatientOverview;
