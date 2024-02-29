import axiosClient from "@/services/axiosConfig";
import ENDPOINT from "@/services/endpoint";

const workingAPI = {
  // WORKING
  getWorkingStatistic(filterTime) {
    return axiosClient.get(ENDPOINT.GET_WORKING_STATISTIC(filterTime));
  },

  getWorkingHistory(filterTime, limit, page) {
    return axiosClient.get(
      ENDPOINT.GET_WORKING_HISTORY(filterTime, limit, page),
    );
  },
};

export default workingAPI;
