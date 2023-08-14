import { Appointment } from "@/lib/types/types";
import { create } from "zustand";

type RecordModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  appointment: Appointment | null;
  setAppointment: (appointment: Appointment) => void;
};

export const useRecordModal = create<RecordModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  appointment: null,
  setAppointment: (appointment) => set({ appointment }),
}));
