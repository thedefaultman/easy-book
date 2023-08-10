import { useReviewModal } from "@/hooks/useReviewModal";
import Modal from "./Modal";
import Rating from "./Rating";

const ReviewModal = () => {
  const { onClose, isOpen, doctor } = useReviewModal();

  return (
    <Modal
      title="Review"
      description="Leave a review for your doctor"
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

        <Rating />
      </div>
    </Modal>
  );
};

export default ReviewModal;
