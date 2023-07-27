import { Allergy, Medication } from "@/lib/types/types";
import { create } from "zustand";

interface IUserInfo {
  login: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  patient: boolean;
  doctor: boolean;
  user_id: string;
  DOB: Date;
  gender: string;
  address: string;
  phone: string;
  specialization: string;
  allergies: Allergy[];
  selectedAllergies: Allergy[];
  medications: Medication[];
  selectedMedications: Medication[];
  setLogin: (value: boolean) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setPatient: (value: boolean) => void;
  setDoctor: (value: boolean) => void;
  setUser_id: (value: string) => void;
  setDOB: (value: Date) => void;
  setGender: (value: string) => void;
  setAddress: (value: string) => void;
  setPhone: (value: string) => void;
  setSpecialization: (value: string) => void;
  setAllergies: (value: Allergy[]) => void;
  setSelectedAllergies: (value: Allergy[]) => void;
  setMedications: (value: Medication[]) => void;
  setSelectedMedications: (value: Medication[]) => void;
  reset: () => void;
}

const useUserInfo = create<IUserInfo>((set) => ({
  login: false,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  patient: true,
  doctor: false,
  user_id: "",
  DOB: new Date(),
  gender: "male",
  address: "",
  phone: "",
  specialization: "",
  allergies: [],
  selectedAllergies: [],
  medications: [],
  selectedMedications: [],
  setLogin: (value) => set(() => ({ login: value })),
  setFirstName: (value) => set(() => ({ firstName: value })),
  setLastName: (value) => set(() => ({ lastName: value })),
  setEmail: (value) => set(() => ({ email: value })),
  setPassword: (value) => set(() => ({ password: value })),
  setPatient: (value) => set(() => ({ patient: value })),
  setDoctor: (value) => set(() => ({ doctor: value })),
  setUser_id: (value) => set(() => ({ user_id: value })),
  setDOB: (value) => set(() => ({ DOB: value })),
  setGender: (value) => set(() => ({ gender: value })),
  setAddress: (value) => set(() => ({ address: value })),
  setPhone: (value) => set(() => ({ phone: value })),
  setSpecialization: (value) => set(() => ({ specialization: value })),
  setAllergies: (value) => set(() => ({ allergies: value })),
  setSelectedAllergies: (value) => set(() => ({ selectedAllergies: value })),
  setMedications: (value) => set(() => ({ medications: value })),
  setSelectedMedications: (value) =>
    set(() => ({ selectedMedications: value })),
  reset: () =>
    set(() => ({
      login: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      patient: true,
      doctor: false,
      user_id: "",
      DOB: new Date(),
      gender: "",
      address: "",
      phone: "",
      specialization: "",
      allergies: [],
      selectedAllergies: [],
      medications: [],
      selectedMedications: [],
    })),
}));

export default useUserInfo;
