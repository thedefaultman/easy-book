import { useEffect } from "react";
import { Medication } from "@/lib/types/types";
import Select from "react-select";

import useUserInfo from "@/hooks/useUserInfo";

const MedicationDropdown = () => {
  const { medications, setMedications, setSelectedMedications } = useUserInfo();

  useEffect(() => {
    const getAllergies = async () => {
      const response = await fetch("/api/medications");
      const data = await response.json();
      setMedications(data);
    };
    getAllergies();
  }, [setMedications]);

  return (
    <div className="flex flex-col w-full mt-2">
      <label
        htmlFor="allergy"
        className="block text-sm font-medium text-gray-700"
      >
        Medications
      </label>

      <Select
        options={medications.map((allergy) => ({
          value: allergy.medicine_id,
          label: allergy.name,
          medicine_id: allergy.medicine_id,
        }))}
        isMulti
        name="medications"
        classNamePrefix="select"
        placeholder="Select medications being taken if any"
        onChange={(e) => {
          setSelectedMedications(e as unknown as Medication[]);
        }}
        required={false}
      />
    </div>
  );
};

export default MedicationDropdown;
