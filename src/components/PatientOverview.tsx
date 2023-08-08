import { useEffect, useState } from "react";

const PatientOverview = () => {
  const [doctorVisits, setDoctorVisits] = useState(null);

  useEffect(() => {
    const getDoctorVisits = async () => {
      const response = await fetch("/api/getDoctorVisits");
      const data = await response.json();
      setDoctorVisits(data);
      console.log(data);
    };

    getDoctorVisits();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-8">
        <div className="bg-white w-full py-6 px-2 font-medium text-md text-neutral-500">
          <h1>Total Doctor Visits</h1>
          <p className="font-medium text-lg text-black">{doctorVisits}</p>
        </div>
        <div className="bg-white w-full py-6 px-2 font-medium text-md text-neutral-500">
          <h1>Reports</h1>
          <p className="font-medium text-lg text-black">2</p>
        </div>
      </div>
    </div>
  );
};

export default PatientOverview;
