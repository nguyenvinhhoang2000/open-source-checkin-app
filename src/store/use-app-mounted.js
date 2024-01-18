import { create } from "zustand";

const useAppMounted = create((set) => ({
  isAppMounted: false,
  isForceLogout: false,
  onSetAppMounted: () => {
    set({ isAppMounted: true });
  },
  onSetForceLogout: () => {
    set({ isForceLogout: true });

    // return false for isForceLogout when user logout
    setTimeout(() => {
      set({ isForceLogout: false });
    }, 500);
  },
}));

export default useAppMounted;
