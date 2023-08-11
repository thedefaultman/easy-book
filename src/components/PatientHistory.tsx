import { Patient } from "@/lib/types/types";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

const PatientHistory = () => {
  const [user, setUser] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getPatient = async () => {
      const res = await fetch("/api/getPatient");
      const data = await res.json();
      setUser(data);
    };

    getPatient();
    setIsLoading(false);
  }, []);

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
            <div className="flex gap-x-8">
              <div className="bg-white shadow-md p-4 rounded-lg w-64">
                <div className="flex justify-center items-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                    <span className="text-gray-600 text-xl">
                      {user.first_name?.charAt(0)}
                    </span>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  {user.first_name} {user.last_name}
                </h2>
                <div className="text-gray-500">
                  <p className="truncate">Email: {user.email || "N/A"}</p>
                  <p>Address: {user.address || "N/A"}</p>
                  <p>Phone: {user.phone || "N/A"}</p>
                  <p>
                    Date of Birth: {user.DOB?.toString().slice(0, 10) || "N/A"}
                  </p>
                  <p>Gender: {user.gender || "N/A"}</p>
                  <p>PHN: {user.PHN}</p>
                </div>
              </div>

              <div className="bg-white shadow-md p-4 rounded-lg flex-1">
                <h1 className="text-lg font-semibold">Allergies</h1>
                {user.allergies?.map((allergy) => (
                  <div key={allergy} className="flex items-center gap-x-2">
                    <span className="text-gray-500 text-sm">{allergy}</span>
                  </div>
                ))}

                {user.allergies?.length === 0 && (
                  <span className="text-gray-500 text-sm">No allergies</span>
                )}
                <h1 className="text-lg font-semibold mt-2">Medications</h1>
                {user.medications?.map((medication) => (
                  <div key={medication} className="flex items-center gap-x-2">
                    <span className="text-gray-500 text-sm">{medication}</span>
                  </div>
                ))}

                {user.medications?.length === 0 && (
                  <span className="text-gray-500 text-sm">No medications</span>
                )}
                <h1 className="text-lg font-semibold mt-2">Records</h1>
                {user.records?.map((record) => (
                  <div
                    key={record.record_id}
                    className="flex items-center gap-x-2"
                  >
                    <span className="text-gray-500 text-sm">
                      {record.record_id}
                    </span>
                    <button className="text-blue-600 text-sm">View</button>
                  </div>
                ))}

                {user.records?.length === 0 && (
                  <span className="text-gray-500 text-sm">No records</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PatientHistory;
