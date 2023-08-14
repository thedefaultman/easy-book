import { Record } from "@/lib/types/types";
import { create } from "zustand";

type ViewRecordModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  record: Record | null;
  setRecord: (record: Record) => void;
};

export const useViewRecordModal = create<ViewRecordModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  record: null,
  setRecord: (record) => set({ record }),
}));
