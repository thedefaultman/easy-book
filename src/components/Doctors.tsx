import { useEffect, useState } from "react";
import { Doctor } from "@/lib/types/types";
import { useReviewModal } from "@/hooks/useReviewModal";
import { useBookingModal } from "@/hooks/useBookingModal";
import { PulseLoader } from "react-spinners";

const Doctors = () => {
  const [user, setUser] = useState<Doctor[] | null>(null);
  const { onOpen: openReviewModal, setDoctor: setReviewDoctor } =
    useReviewModal();
  const { onOpen: openBookingModal, setDoctor: setBookingDoctor } =
    useBookingModal();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getDoctors = async () => {
      const res = await fetch("/api/getDoctors");
      const data = await res.json();
      setUser(data);
    };

    getDoctors();
    setIsLoading(false);
  }, []);

  const handleReview = async (e: React.FormEvent, doctor: Doctor) => {
    e.preventDefault();
    setReviewDoctor(doctor);
    openReviewModal();
  };

  const handleBooking = async (e: React.FormEvent, doctor: Doctor) => {
    e.preventDefault();
    setBookingDoctor(doctor);
    openBookingModal();
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
        <div className="p-4">
          {user && (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8">
              {user.map((doctor) => (
                <div
                  key={doctor.user_id}
                  className="bg-white shadow-md p-4 rounded-lg w-64"
                >
                  <div className="flex justify-center items-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                      <span className="text-gray-600 text-xl">
                        {doctor.first_name?.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 truncate">
                    Dr. {doctor.first_name} {doctor.last_name}
                  </h2>
                  <div className="text-gray-500">
                    <p className="truncate">Email: {doctor.email || "N/A"}</p>
                    <p>Specialization: {doctor.specialization || "N/A"}</p>
                    <p>
                      Date of Birth:{" "}
                      {doctor.DOB?.toString().slice(0, 10) || "N/A"}
                    </p>
                    <p>Gender: {doctor.gender || "N/A"}</p>
                  </div>
                  <div className="mt-4 flex flex-col justify-start items-start gap-y-4 w-full">
                    <button
                      onClick={(e) => handleReview(e, doctor)}
                      className="bg-blue-500 hover:bg-blue-600 text-white bg-blue rounded-md text-sm p-2 hover:text-blue hover:border-blue hover:bg-white w-full"
                    >
                      Leave a Review
                    </button>
                    <button
                      onClick={(e) => handleBooking(e, doctor)}
                      className="bg-blue-500 hover:bg-blue-600 text-white bg-blue rounded-md text-sm p-2 hover:text-blue hover:border-blue hover:bg-white w-full"
                    >
                      Book with this Doctor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Doctors;
