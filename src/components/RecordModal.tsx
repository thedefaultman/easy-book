import { useState } from "react";
import { useRecordModal } from "@/hooks/useRecordModal";
import Modal from "./Modal";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

const RecordModal = () => {
  const { isOpen, onClose, appointment } = useRecordModal();
  const { session, supabaseClient: supabase } = useSessionContext();

  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.from("record").insert([
      {
        appointment_id: appointment?.appointment_id,
        diagnosis: diagnosis,
        treatment: treatment,
        doctor_id: session?.user.user_metadata.user_id,
        PHN: appointment?.PHN,
      },
    ]);

    if (error) {
      console.error("Error creating record:", error.message);
    } else {
      toast.success("Record created successfully!");
    }

    onClose();
  };

  return (
    <Modal
      title="Record"
      description="Create a record for this appointment"
      isOpen={isOpen}
      onChange={() => {
        if (isOpen) onClose();
      }}
    >
      <div className="flex justify-center items-center h-96 bg-slate-200 rounded">
        <form onSubmit={handleSubmit} className="space-y-4 text-blue">
          <div className="flex flex-col">
            <label htmlFor="diagnosis" className="mb-1">
              Diagnosis:
            </label>
            <input
              type="text"
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="px-4 py-2 text-blue placeholder-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="treatment" className="mb-1">
              Treatment:
            </label>
            <input
              type="text"
              id="treatment"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              className="px-4 py-2 text-blue placeholder-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default RecordModal;
