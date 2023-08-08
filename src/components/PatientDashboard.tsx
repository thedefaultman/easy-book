import React, { useState } from "react";
import PatientOverview from "./PatientOverview";
import PatientHistory from "./PatientHistory";

const PatientDashboard = () => {
  const [active, setActive] = useState("Overview");
  const buttons = [
    {
      name: "Overview",
    },
    {
      name: "Appointments",
    },
    {
      name: "My History",
    },
    {
      name: "Doctors",
    },
  ];

  return (
    <div className="rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <h1 className="text-3xl font-bold p-4">Patient Dashboard</h1>

      <div className="flex justify-start items-center gap-x-4 p-4">
        {buttons.map((button) => (
          <button
            key={button.name}
            className={`text-md text-black ${
              button.name === active && "text-blue border-b border-blue"
            }`}
            onClick={() => {
              setActive(button.name);
            }}
          >
            {button.name}
          </button>
        ))}
      </div>

      {active === "Overview" && <PatientOverview />}
      {active === "Appointments" && <div>Appointments</div>}
      {active === "My History" && <PatientHistory />}
      {active === "Doctors" && <div>Doctors</div>}
    </div>
  );
};

export default PatientDashboard;
