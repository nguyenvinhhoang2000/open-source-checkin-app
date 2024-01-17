import { create } from "zustand";

const useAppMounted = create((set) => ({
  isAppMounted: false,
  onSetAppMounted: () => {
    set({ isAppMounted: true });
  },
}));

export default useAppMounted;
