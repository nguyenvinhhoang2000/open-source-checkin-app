import { create } from "zustand";

import { defaultItemFilterTime } from "@/constants/default-item-filter-time";
import workingAPI from "@/services/workingApi";
import { storeResult } from "@/utils/return-message";

const useWorkingStatisticStore = create((set, get) => ({
  filterTimeWorkingHistory: defaultItemFilterTime[0].key,
  limit: 10,
  pageWorkingHistory: 1,

  listWorkingHistory: [],
  totalWorkingHistory: 0,

  filterTimeWorkingStatistic: defaultItemFilterTime[0].key,
  totalEarly: 0,
  totalLater: 0,
  totalAbsent: 0,

  isLoadingGetWorkingStatistic: false,
  isLoadingGetWorkingHistory: false,

  onGetWorkingStatistic: async () => {
    try {
      const { filterTimeWorkingStatistic } = get();

      set({
        isLoadingGetWorkingStatistic: true,
      });

      const {
        data: {
          message,
          payload: [{ totalEarly, totalLater, totalAbsent }],
        },
      } = await workingAPI.getWorkingStatistic(filterTimeWorkingStatistic);

      set({
        totalEarly,
        totalLater,
        totalAbsent,
      });

      return storeResult.onSuccess(message);
    } catch (error) {
      return storeResult.onFail(error.response?.data);
    } finally {
      set({ isLoadingGetWorkingStatistic: false });
    }
  },

  onGetWorkingHistory: async (filterTime, page) => {
    try {
      const { filterTimeWorkingHistory, limit, pageWorkingHistory } = get();

      set({
        isLoadingGetWorkingHistory: true,
      });

      const {
        data: {
          message,
          payload: { data, total },
        },
      } = await workingAPI.getWorkingHistory(
        filterTime || filterTimeWorkingHistory,
        limit,
        page || pageWorkingHistory,
      );

      set({
        filterTimeWorkingHistory: filterTime || filterTimeWorkingHistory,
        pageWorkingHistory: page || pageWorkingHistory,
        listWorkingHistory: data,
        totalWorkingHistory: total,
      });

      return storeResult.onSuccess(message);
    } catch (error) {
      return storeResult.onFail(error.response?.data);
    } finally {
      set({ isLoadingGetWorkingHistory: false });
    }
  },

  onClearListWorkingHistory: async () => {
    set({
      filterTimeWorkingHistory: defaultItemFilterTime[0].key,

      pageWorkingHistory: 1,

      limit: 10,

      listWorkingHistory: [],
      totalWorkingHistory: 0,
    });
  },
}));

export default useWorkingStatisticStore;
