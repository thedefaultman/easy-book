import React, { useState, useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Appointment } from "@/lib/types/types";

const Appointments = () => {
  const { supabaseClient: supabase, session } = useSessionContext();

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from("appointment")
        .select("*")
        .eq("PHN", session?.user.user_metadata.user_id)
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching appointments:", error.message);
      } else {
        setAppointments(data);
      }
    };

    fetchAppointments();
  }, [session?.user.user_metadata.user_id, supabase]);

  const handleEditAppointment = () => {
    // Handle edit logic, e.g., open a modal for rescheduling or canceling
    // Doing this after creating the booking logic
  };

  return (
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
                  onClick={() => handleEditAppointment()}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
