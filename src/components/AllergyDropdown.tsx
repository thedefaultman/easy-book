import { Allergy } from "@/lib/types/types";
import React, { useEffect } from "react";
import Select, { ActionMeta } from "react-select";

import useUserInfo from "@/hooks/useUserInfo";

const AllergyDropdown = () => {
  const { allergies, setAllergies, setSelectedAllergies } = useUserInfo();

  useEffect(() => {
    const getAllergies = async () => {
      const response = await fetch("/api/allergies");
      const data = await response.json();
      setAllergies(data);
    };
    getAllergies();
  }, [setAllergies]);

  return (
    <div className="flex flex-col w-full mt-2">
      <label
        htmlFor="allergy"
        className="block text-sm font-medium text-gray-700"
      >
        Allergy
      </label>

      <Select
        options={allergies.map((allergy) => ({
          value: allergy.allergy_id,
          label: allergy.name,
          allergy_id: allergy.allergy_id,
        }))}
        isMulti
        name="allergy"
        classNamePrefix="select"
        placeholder="Select Allergies If Any"
        onChange={(e) => {
          setSelectedAllergies(e as unknown as Allergy[]);
        }}
        required={false}
      />
    </div>
  );
};

export default AllergyDropdown;
