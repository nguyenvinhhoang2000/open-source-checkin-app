import dayjs from "dayjs";

import { FORMAT_API_DATE } from "@/constants/format-api-date";
import axiosClient from "@/services/axiosConfig";
import ENDPOINT from "@/services/endpoint";

const userAPI = {
  // LOGIN
  login(value) {
    return axiosClient.post(ENDPOINT.LOGIN, value);
  },

  // USER
  getProfile() {
    return axiosClient.get(ENDPOINT.GET_USER_PROFILE);
  },
  editProfile(value) {
    return axiosClient.post(ENDPOINT.EDIT_USER_PROFILE, value);
  },
  changeAvatar(id) {
    return axiosClient.put(ENDPOINT.CHANGE_USER_AVATAR, { avatar: id });
  },

  // ABSENT
  createAbsentRequest({ absentType, reasonType, description, fromAt, toAt }) {
    return axiosClient.post(ENDPOINT.CREATE_ABSENT_REQUEST, {
      absentType,
      reasonType,
      description,
      fromAt: dayjs(fromAt).format(FORMAT_API_DATE),
      toAt: dayjs(toAt).format(FORMAT_API_DATE),
    });
  },
  getListAbsentRequest(value) {
    return axiosClient.get(ENDPOINT.GET_LIST_ABSENT_REQUEST, value);
  },
  getAbsentRequestDetails(value, id) {
    return axiosClient.get(ENDPOINT.GET_ABSENT_REQUEST_DETAILS(id), value);
  },
  editAbsentRequest(value, id) {
    return axiosClient.get(ENDPOINT.EDIT_ABSENT_REQUEST(id), value);
  },
};

export default userAPI;
