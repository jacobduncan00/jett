import create from "zustand";

export const useStore = create((set: any) => ({
  time: "30",
  sentences: "4",
  setTime: (time: string) => set({ time }),
  setSentences: (sentences: string) => set({ sentences }),
}));
