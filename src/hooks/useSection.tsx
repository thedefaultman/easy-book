import { create } from "zustand";

type SectionState = {
  activeSection: string;
  setSection: (section: string) => void;
};

export const useSection = create<SectionState>((set) => ({
  activeSection: "Overview",
  setSection: (section) => set(() => ({ activeSection: section })),
}));
