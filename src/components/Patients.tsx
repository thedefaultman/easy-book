import { useEffect, useState } from "react";
import { Patient } from "@/lib/types/types";
import { PulseLoader } from "react-spinners";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useHistoryModal } from "@/hooks/useHistoryModal";

const Patients = () => {
  const [user, setUser] = useState<Patient[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { onOpen, setPatient } = useHistoryModal();
  const { supabaseClient: supabase } = useSessionContext();

  useEffect(() => {
    setIsLoading(true);
    const fetchPatients = async () => {
      const { data, error } = await supabase.from("patient").select("*");

      if (error) {
        console.log(error);
      } else {
        setUser(data);
      }
    };

    fetchPatients();

    setIsLoading(false);
  }, [supabase]);

  const handleHistory = async (e: React.FormEvent, patient: Patient) => {
    e.preventDefault();
    const data = await fetch("/api/getPatient", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        patient_id: patient.user_id,
      },
    });
    const res = await data.json();

    setPatient(res);
    onOpen();
  };

  return (
    <>
      {isLoading || !user ? (
        <div className="flex justify-center items-center h-96">
          <div className="flex justify-center items-center relative mx-auto w-full h-full">
            <PulseLoader color="#0F62FE" />
          </div>
        </div>
      ) : (
        <div className="p-4">
          {user && (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8">
              {user.map((patient) => (
                <div
                  key={patient.user_id}
                  className="bg-white shadow-md p-4 rounded-lg w-64"
                >
                  <div className="flex justify-center items-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                      <span className="text-gray-600 text-xl">
                        {patient.first_name?.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 truncate">
                    {patient.first_name} {patient.last_name}
                  </h2>
                  <div className="text-gray-500">
                    <p className="truncate">Email: {patient.email || "N/A"}</p>
                    <p>
                      Date of Birth:{" "}
                      {patient.DOB?.toString().slice(0, 10) || "N/A"}
                    </p>
                    <p>Gender: {patient.gender || "N/A"}</p>
                  </div>
                  <div className="mt-4 flex flex-col justify-start items-start gap-y-4 w-full">
                    <button
                      onClick={(e) => handleHistory(e, patient)}
                      className="bg-blue-500 hover:bg-blue-600 text-white bg-blue rounded-md text-sm p-2 hover:text-blue hover:border-blue hover:bg-white w-full"
                    >
                      View History
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

export default Patients;
