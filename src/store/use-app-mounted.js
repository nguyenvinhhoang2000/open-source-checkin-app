import { create } from "zustand";

const useAppMounted = create((set) => ({
  isAppMounted: false,
  isForceLogout: false,
  onSetAppMounted: () => {
    set({ isAppMounted: true });
  },
  onSetForceLogout: () => {
    set({ isForceLogout: true });
  },
}));

export default useAppMounted;
