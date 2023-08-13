import { useSection } from "@/hooks/useSection";
import Appointment from "./Appointments";
import Patients from "./Patients";
import DoctorOverview from "./DoctorOverview";
import { useReviewModal } from "@/hooks/useReviewModal";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import ReviewModal from "./ReviewModal";

const DoctorDashboard = () => {
  const { activeSection, setSection } = useSection();
  const { onOpen, setDoctor } = useReviewModal();
  const { session, supabaseClient: supabase } = useSessionContext();

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
    {
      name: "Reviews",
    },
  ];

  useEffect(() => {
    if (session) {
      const fetchDoctor = async () => {
        const { data, error } = await supabase
          .from("doctor")
          .select("*")
          .eq("user_id", session.user.id)
          .single();
        if (error) {
          console.log(error);
        } else {
          setDoctor(data);
        }
      };
      fetchDoctor();
    }
  }, [session, setDoctor, supabase]);

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
              if (section.name === "Reviews") {
                onOpen();
                return;
              }
            }}
          >
            {section.name}
          </button>
        ))}
      </div>

      {activeSection === "Overview" && <DoctorOverview />}
      {activeSection === "Appointments" && <Appointment />}
      {activeSection === "Patients" && <Patients />}
      {activeSection === "Reviews" && <DoctorOverview />}
    </div>
  );
};

export default DoctorDashboard;
