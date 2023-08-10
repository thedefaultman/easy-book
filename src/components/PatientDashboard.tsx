import { useSection } from "@/hooks/useSection";
import PatientOverview from "./PatientOverview";
import PatientHistory from "./PatientHistory";
import Doctors from "./Doctors";
import Appointment from "./Appointments";

const PatientDashboard = () => {
  const { activeSection, setSection } = useSection();
  const sections = [
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

      {activeSection === "Overview" && <PatientOverview />}
      {activeSection === "Appointments" && <Appointment />}
      {activeSection === "My History" && <PatientHistory />}
      {activeSection === "Doctors" && <Doctors />}
    </div>
  );
};

export default PatientDashboard;
