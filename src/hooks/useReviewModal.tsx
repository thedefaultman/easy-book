import { Doctor } from "@/lib/types/types";
import { create } from "zustand";

interface ReviewModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  doctor: Doctor | null;
  setDoctor: (doctor: Doctor) => void;
}

export const useReviewModal = create<ReviewModalState>((set) => ({
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  isOpen: false,
  doctor: null,
  setDoctor: (doctor: Doctor) => set({ doctor }),
}));
