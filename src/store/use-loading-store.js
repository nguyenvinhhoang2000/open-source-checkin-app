import { create } from "zustand";

const useLoadingStore = create((set, get) => ({
  isRefreshAbsentTable: 0,

  isLoadingAbsentTable: true,

  onShowLoadingAbsentTable: () => {
    set({ isLoadingAbsentTable: true });
  },

  onHideLoadingAbsentTable: () => {
    set({ isLoadingAbsentTable: false });
  },

  onRefreshAbsentTable: () => {
    set({ isRefreshAbsentTable: get().isRefreshAbsentTable + 1 });
  },
}));

export default useLoadingStore;
