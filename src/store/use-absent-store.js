import { create } from "zustand";

import { defaultItemFilterTime } from "@/constants/default-item-filter-time";
import userAPI from "@/services/userApi";
import { storeResult } from "@/utils/return-message";

const useAbsentStore = create((set, get) => ({
  filterTime: defaultItemFilterTime[0].key,

  page: 1,

  limit: 10,

  listAbsent: [],

  totalAbsent: 0,

  isLoadingAbsentTable: false,

  onCreateAbsentRequest: async (data) => {
    try {
      set({ isLoadingAbsentTable: true });

      const { filterTime, onGetListAbsentRequest, page } = get();

      const { data: apiData } = await userAPI.createAbsentRequest(data);

      await onGetListAbsentRequest(filterTime, page);

      return storeResult.onSuccess(apiData);
    } catch (error) {
      return storeResult.onFail(error.response?.data);
    } finally {
      set({ isLoadingAbsentTable: false });
    }
  },

  onEditAbsentRequest: async (data, id) => {
    try {
      set({ isLoadingAbsentTable: true });

      const { filterTime, onGetListAbsentRequest, page } = get();

      const { data: apiData } = await userAPI.editAbsentRequest(data, id);

      await onGetListAbsentRequest(filterTime, page);

      return storeResult.onSuccess(apiData);
    } catch (error) {
      return storeResult.onFail(error.response?.data);
    } finally {
      set({ isLoadingAbsentTable: false });
    }
  },

  onGetListAbsentRequest: async (filterTime, page) => {
    try {
      set({
        isLoadingAbsentTable: true,
      });

      const { limit } = get();

      const {
        data: {
          message,
          payload: { data, total },
        },
      } = await userAPI.getListAbsentRequest(filterTime, page, limit);

      set({
        listAbsent: data,
        totalAbsent: total,
        page,
      });

      return storeResult.onSuccess(message);
    } catch (error) {
      return storeResult.onFail(error.response?.data?.errors?.msg, []);
    } finally {
      set({ isLoadingAbsentTable: false });
    }
  },

  onClearListAbsentRequest: async () => {
    set({
      filterTime: defaultItemFilterTime[0].key,

      page: 1,

      limit: 10,

      listAbsent: [],
    });
  },
}));

export default useAbsentStore;
