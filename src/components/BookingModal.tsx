import React, { useEffect, useState } from "react";
import { useBookingModal } from "@/hooks/useBookingModal";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";

const ReviewModal = () => {
  const { session, supabaseClient: supabase, isLoading } = useSessionContext();
  const { onClose, isOpen, doctor } = useBookingModal();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    const getAvailableTimes = async () => {
      const { data: bookedTimes, error } = await supabase
        .from("appointment")
        .select("time")
        .eq("doctor_id", doctor?.doctor_id)
        .eq("date", date)
        .neq("status", "Cancelled");

      console.log(bookedTimes);

      if (error) {
        console.error("Error fetching appointments:", error.message);
      }

      if (!date) return [];

      const availableTimes = [
        "09:00:00",
        "09:30:00",
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "1:00:00",
        "1:30:00",
        "2:00:00",
        "2:30:00",
        "3:00:00",
        "3:30:00",
        "4:00:00",
        "4:30:00",
        "5:00:00",
      ];
      setAvailableTimes(
        availableTimes.filter(
          (time) => !bookedTimes?.map((t) => t.time).includes(time)
        )
      );
    };

    getAvailableTimes();
  }, [date, doctor?.doctor_id, setAvailableTimes, supabase]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("appointment")
      .select("*")
      .eq("doctor_id", doctor?.doctor_id)
      .eq("date", date)
      .eq("time", time);

    if (error) {
      console.error("Error fetching appointments:", error.message);
    } else {
      if (data.length > 0) {
        toast.error("This time slot is not available.");
      } else {
        const { data: appointment, error: appointmentError } = await supabase
          .from("appointment")
          .insert([
            {
              doctor_id: doctor?.doctor_id,
              PHN: session?.user.user_metadata.user_id,
              date,
              time,
              reason,
              status: "pending",
              patient_first: session?.user.user_metadata.first_name,
              patient_last: session?.user.user_metadata.last_name,
              doctor_first: doctor?.first_name,
              doctor_last: doctor?.last_name,
            },
          ]);

        if (appointmentError) {
          console.error(
            "Error creating appointment:",
            appointmentError.message
          );
        } else {
          toast.success("Appointment created successfully!");
          onClose();
        }
      }
    }
  };

  return (
    <Modal
      title="Booking"
      description="Please fill out the form below to book an appointment."
      isOpen={isOpen}
      onChange={() => {
        if (isOpen) onClose();
      }}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex justify-start items-center mb-4 gap-x-2 border-b border-b-blue pb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
            <span className="text-gray-600 text-xl">
              {doctor?.first_name?.charAt(0)}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start">
            <h2 className="text-xl font-semibold mb-2">
              Dr. {doctor?.first_name} {doctor?.last_name}
            </h2>
            <h3>{doctor?.specialization}</h3>
          </div>
        </div>
        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className="flex flex-col space-y-4"
        >
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={new Date().toISOString().split("T")[0]}
            max={
              new Date(new Date().setDate(new Date().getDate() + 14))
                .toISOString()
                .split("T")[0]
            }
          />

          <label htmlFor="time">
            Time: <i>Hours are 9:00 to 5:00</i>
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Select a time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          <label htmlFor="reason">Appointment Reason</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue text-white py-2 px-4 rounded"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
