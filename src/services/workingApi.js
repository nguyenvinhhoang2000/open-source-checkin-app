import axiosClient from "@/services/axiosConfig";
import ENDPOINT from "@/services/endpoint";

const workingAPI = {
  // WORKING
  getWorkingStatistic(filterTime) {
    return axiosClient.get(ENDPOINT.GET_WORKING_STATISTIC(filterTime));
  },
};

export default workingAPI;
