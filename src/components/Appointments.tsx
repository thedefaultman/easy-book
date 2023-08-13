import React, { useState, useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Appointment } from "@/lib/types/types";
import { PulseLoader } from "react-spinners";

const Appointments = () => {
  const { supabaseClient: supabase, session } = useSessionContext();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      const userType = session?.user.user_metadata.user_role;
      const userId = userType === "Patient" ? "PHN" : "doctor_id";

      const { data, error } = await supabase
        .from("appointment")
        .select("*")
        .eq(userId, session?.user.user_metadata.user_id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching appointments:", error.message);
      } else {
        setAppointments(data);
      }
      setIsLoading(false);
    };

    fetchAppointments();
  }, [
    session?.user.user_metadata.user_id,
    session?.user.user_metadata.user_role,
    supabase,
  ]);

  const handleEditAppointment = async (appointment: Appointment) => {
    if (session?.user.user_metadata.user_role === "Patient") {
      const { data, error } = await supabase
        .from("appointment")
        .update({ status: "Cancelled" })
        .eq("appointment_id", appointment.appointment_id);

      if (error) {
        console.error("Error updating appointment:", error.message);
      }
    } else {
      const { data, error } = await supabase
        .from("appointment")
        .update({ status: "Completed" })
        .eq("appointment_id", appointment.appointment_id);

      if (error) {
        console.error("Error updating appointment:", error.message);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="flex justify-center items-center relative mx-auto w-full h-full">
            <PulseLoader color="#0F62FE" />
          </div>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Your Appointments
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Browse a list of your appointments.
              </p>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Doctor Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.appointment_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.date}
                  </td>
                  <td className="px-6 py-4">{appointment.time}</td>
                  <td className="px-6 py-4">
                    {appointment.patient_first} {appointment.patient_last}
                  </td>
                  <td className="px-6 py-4">
                    {appointment.doctor_first} {appointment.doctor_last}
                  </td>
                  <td className="px-6 py-4">{appointment.reason}</td>
                  <td className="px-6 py-4">{appointment.status}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEditAppointment(appointment)}
                      className="font-medium text-blue hover:underline"
                    >
                      {session?.user.user_metadata.user_role === "Patient" ? (
                        <span>Cancel Appointment</span>
                      ) : (
                        <span>Mark Complete</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Appointments;
