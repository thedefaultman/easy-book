import Modal from "./Modal";
import { useHistoryModal } from "@/hooks/useHistoryModal";

const HistoryModal = () => {
  const { onClose, isOpen, patient } = useHistoryModal();

  return (
    <Modal
      title="History"
      description="You are viewing the history of this patient"
      isOpen={isOpen}
      onChange={() => {
        if (isOpen) onClose();
      }}
    >
      <div className="p-4">
        {patient && (
          <div className="flex flex-col items-center justify-center gap-x-8">
            <div className="bg-white shadow-lg border border-blue p-4 rounded-lg w-full text-blue">
              <div className="flex justify-center items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-xl">
                    {patient.first_name?.charAt(0)}
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-blue">
                {patient.first_name} {patient.last_name}
              </h2>
              <div className="text-black">
                <p className="truncate">Email: {patient.email || "N/A"}</p>
                <p>Address: {patient.address || "N/A"}</p>
                <p>Phone: {patient.phone || "N/A"}</p>
                <p>
                  Date of Birth: {patient.DOB?.toString().slice(0, 10) || "N/A"}
                </p>
                <p>Gender: {patient.gender || "N/A"}</p>
                <p>PHN: {patient.PHN}</p>
                <h1 className="text-lg text-blue mt-2 font-semibold">
                  Allergies
                </h1>
                {patient.allergies?.map((allergy) => (
                  <div key={allergy} className="flex items-center gap-x-2">
                    <span className="text-black text-sm">{allergy}</span>
                  </div>
                ))}

                {patient.allergies?.length === 0 && (
                  <span className="text-blue text-sm">No allergies</span>
                )}
                <h1 className="text-lg font-semibold mt-2 text-blue">
                  Medications
                </h1>
                {patient.medications?.map((medication) => (
                  <div key={medication} className="flex items-center gap-x-2">
                    <span className="text-black text-sm">{medication}</span>
                  </div>
                ))}

                {patient.medications?.length === 0 && (
                  <span className="text-black text-sm">No medications</span>
                )}
                <h1 className="text-lg text-blue font-semibold mt-2">
                  Records
                </h1>
                {patient.records?.map((record) => (
                  <div
                    key={record.record_id}
                    className="flex items-center gap-x-2"
                  >
                    <span className="text-black text-sm">
                      {record.record_id}
                    </span>
                    <button className="text-blue text-sm">View</button>
                  </div>
                ))}

                {patient.records?.length === 0 && (
                  <span className="text-black text-sm">No records</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default HistoryModal;
