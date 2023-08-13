import { useReviewModal } from "@/hooks/useReviewModal";
import { Patient } from "@/lib/types/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import UpcomingAppointments from "./UpcomingAppointments";

const DoctorOverview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { session, supabaseClient: supabase } = useSessionContext();
  const { setDoctor, doctor } = useReviewModal();
  const [newPatients, setNewPatients] = useState<Patient[]>([]);

  useEffect(() => {
    if (session) {
      setIsLoading(true);
      const fetchDoctor = async () => {
        const { data, error } = await supabase
          .from("doctor")
          .select("*")
          .eq("user_id", session.user.id)
          .single();
        if (error) {
          console.log(error);
        } else {
          setDoctor(data);
        }
        setIsLoading(false);
      };
      fetchDoctor();

      const fetchNewPatients = async () => {
        const { data, error } = await supabase
          .from("patient")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) {
          console.log(error);
        } else {
          setNewPatients(data);
        }
      };

      fetchNewPatients();
    }
  }, [session, setDoctor, supabase]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="flex justify-center items-center relative mx-auto w-full h-full">
            <PulseLoader color="#0F62FE" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-start p-4">
          <div className="bg-white w-full font-medium text-md text-neutral-500 p-4">
            <div className="bg-white w-full font-medium text-md text-neutral-500 flex gap-x-8 justify-start items-center p-4">
              <h1 className="text-2xl font-bold text-blue">New Patients</h1>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-y-4 p-4">
              {newPatients.map((patient) => (
                <div
                  key={patient.PHN}
                  className="w-full flex flex-col justify-start items-start gap-y-2 p-4 border border-neutral-200 rounded-lg"
                >
                  <div className="w-full flex justify-between items-center">
                    <h1 className="text-lg font-bold text-black">
                      {patient.first_name} {patient.last_name}
                    </h1>
                    <h1 className="text-md font-medium text-neutral-500">
                      {patient.created_at}
                    </h1>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <h1 className="text-md font-medium text-neutral-500">
                      {patient.email}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {doctor && <UpcomingAppointments id={doctor!.doctor_id} />}
        </div>
      )}
    </>
  );
};

export default DoctorOverview;
