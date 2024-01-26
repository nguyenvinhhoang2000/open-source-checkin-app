import { create } from "zustand";

import { defaultItemFilterTime } from "@/constants/default-item-filter-time";
import userAPI from "@/services/userApi";
import { storeResult } from "@/utils/return-message";

const useAbsentStore = create((set, get) => ({
  filterTimeAbsent: defaultItemFilterTime[0].key,
  pageAbsent: 1,
  limit: 10,
  listAbsent: [],
  totalAbsent: 0,

  isLoadingAbsentTable: false,

  onCreateAbsentRequest: async (data) => {
    try {
      const { filterTimeAbsent, onGetListAbsentRequest, pageAbsent } = get();

      set({ isLoadingAbsentTable: true });

      const { data: apiData } = await userAPI.createAbsentRequest(data);

      await onGetListAbsentRequest(filterTimeAbsent, pageAbsent);

      return storeResult.onSuccess(apiData);
    } catch (error) {
      return storeResult.onFail(error.response?.data);
    } finally {
      set({ isLoadingAbsentTable: false });
    }
  },

  onEditAbsentRequest: async (data, id) => {
    try {
      const { filterTimeAbsent, onGetListAbsentRequest, pageAbsent } = get();

      set({ isLoadingAbsentTable: true });

      const { data: apiData } = await userAPI.editAbsentRequest(data, id);

      await onGetListAbsentRequest(filterTimeAbsent, pageAbsent);

      return storeResult.onSuccess(apiData);
    } catch (error) {
      return storeResult.onFail(error.response?.data);
    } finally {
      set({ isLoadingAbsentTable: false });
    }
  },

  onGetListAbsentRequest: async () => {
    try {
      const { filterTimeAbsent, pageAbsent, limit } = get();

      set({
        isLoadingAbsentTable: true,
      });

      const {
        data: {
          message,
          payload: { data, total },
        },
      } = await userAPI.getListAbsentRequest(
        filterTimeAbsent,
        pageAbsent,
        limit,
      );

      set({
        listAbsent: data,
        totalAbsent: total,
        pageAbsent,
      });

      return storeResult.onSuccess(message);
    } catch (error) {
      return storeResult.onFail(error.response?.data);
    } finally {
      set({ isLoadingAbsentTable: false });
    }
  },

  onClearListAbsentRequest: async () => {
    set({
      filterTimeAbsent: defaultItemFilterTime[0].key,

      pageAbsent: 1,

      limit: 10,

      listAbsent: [],
    });
  },

  onSetFilterTime: async (filterTimeAbsent) => {
    set({
      filterTimeAbsent,
    });

    get().onGetListAbsentRequest();
  },

  onSetPage: async (pageAbsent) => {
    set({
      pageAbsent,
    });

    get().onGetListAbsentRequest();
  },
}));

export default useAbsentStore;
