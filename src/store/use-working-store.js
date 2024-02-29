import { create } from "zustand";

import { defaultItemFilterTime } from "@/constants/default-item-filter-time";
import workingAPI from "@/services/workingApi";
import { storeResult } from "@/utils/return-message";

const useWorkingStatisticStore = create((set, get) => ({
  filterTime: defaultItemFilterTime[0].key,
  totalEarly: 0,
  totalLater: 0,
  totalAbsent: 0,

  isLoadingGetWorkingStatistic: false,

  onGetWorkingStatistic: async () => {
    try {
      const { filterTime } = get();

      set({
        isLoadingGetWorkingStatistic: true,
      });

      const {
        data: {
          message,
          payload: [{ totalEarly, totalLater, totalAbsent }],
        },
      } = await workingAPI.getWorkingStatistic(filterTime);

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
}));

export default useWorkingStatisticStore;
