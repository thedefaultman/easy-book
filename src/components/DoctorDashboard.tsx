import { useSection } from "@/hooks/useSection";
import Appointment from "./Appointments";
import Patients from "./Patients";
import DoctorOverview from "./DoctorOverview";

const DoctorDashboard = () => {
  const { activeSection, setSection } = useSection();
  const sections = [
    {
      name: "Overview",
    },
    {
      name: "Appointments",
    },
    {
      name: "Patients",
    },
  ];
  return (
    <div className="rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <h1 className="text-3xl font-bold p-4">Doctor Dashboard</h1>

      <div className="flex justify-start items-center gap-x-4 p-4">
        {sections.map((section) => (
          <button
            key={section.name}
            className={`text-md text-black ${
              section.name === activeSection && "text-blue border-b border-blue"
            }`}
            onClick={() => {
              setSection(section.name);
            }}
          >
            {section.name}
          </button>
        ))}
      </div>

      {activeSection === "Overview" && <DoctorOverview />}
      {activeSection === "Appointments" && <Appointment />}
      {activeSection === "Patients" && <Patients />}
    </div>
  );
};

export default DoctorDashboard;
