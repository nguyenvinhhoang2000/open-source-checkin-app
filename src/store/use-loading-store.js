import { create } from "zustand";

const useLoadingStore = create((set) => ({
  isLoadingAbsentTable: true,

  onShowLoadingAbsentTable: () => {
    set({ isLoadingAbsentTable: true });
  },

  onHideLoadingAbsentTable: () => {
    set({ isLoadingAbsentTable: false });
  },
}));

export default useLoadingStore;
