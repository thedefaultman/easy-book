import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Appointment } from "@/lib/types/types";
import { PulseLoader } from "react-spinners";
import { useSection } from "@/hooks/useSection";

interface Props {
  id: string;
}

const UpcomingAppointments: React.FC<Props> = ({ id }) => {
  const { supabaseClient: supabase } = useSessionContext();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setSection } = useSection();

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from("appointment")
        .select("*")
        .or("doctor_id.eq." + id + ",PHN.eq." + id)
        .order("date", { ascending: true })
        .limit(5);

      if (error) {
        console.log(error);
      } else {
        setAppointments(data);
      }
      setIsLoading(false);
    };
    fetchAppointments();
  }, [id, supabase]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="flex justify-center items-center relative mx-auto w-full h-full">
            <PulseLoader color="#0F62FE" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-start p-4 w-full bg-white">
          <div className="bg-white w-full font-medium text-md text-neutral-500 flex gap-x-8 justify-start items-center p-4">
            <h1 className="text-2xl font-bold text-blue">
              Upcoming Appointments
            </h1>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-y-4 p-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.appointment_id}
                className="w-full flex flex-col justify-start items-start gap-y-2 p-4 border border-neutral-200 rounded-lg"
              >
                <div className="w-full flex justify-between items-center">
                  <h1 className="text-lg font-bold">
                    {appointment.patient_first} {appointment.patient_last}
                  </h1>
                  <h1 className="text-md font-medium text-neutral-500">
                    {appointment.date}
                  </h1>
                </div>
                <div className="w-full flex justify-between items-center">
                  <h1 className="text-md font-medium text-neutral-500">
                    {appointment.time}
                  </h1>
                  <button
                    className="text-blue"
                    onClick={() => {
                      setSection("Appointments");
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingAppointments;
