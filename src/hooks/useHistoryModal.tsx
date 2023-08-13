import { Patient } from "@/lib/types/types";
import { create } from "zustand";

type HistoryModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  patient: Patient;
  setPatient: (patient: Patient) => void;
};

export const useHistoryModal = create<HistoryModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  patient: {} as Patient,
  setPatient: (patient) => set({ patient }),
}));
