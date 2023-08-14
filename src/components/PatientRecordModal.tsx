import { useViewRecordModal } from "@/hooks/useViewRecordModal";
import Modal from "./Modal";

const PatientRecordModal = () => {
  const { isOpen, onClose, record } = useViewRecordModal();

  return (
    <Modal
      title="View Record"
      description="View the details of this record"
      isOpen={isOpen}
      onChange={() => {
        if (isOpen) onClose();
      }}
    >
      <div className="flex flex-col space-y-4 text-gray-700">
        {/* Display record details */}
        <div>
          <strong>Record ID:</strong> {record?.record_id}
        </div>
        <div>
          <strong>Diagnosis:</strong> {record?.diagnosis}
        </div>
        <div>
          <strong>Treatment:</strong> {record?.treatment}
        </div>
        <div>
          <strong>Created At:</strong> {record?.created_at}
        </div>
      </div>
    </Modal>
  );
};

export default PatientRecordModal;
