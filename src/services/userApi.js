import dayjs from "dayjs";

import { FORMAT_DATE } from "@/constants/format-date";
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
  editProfile({ phoneNumber, note }) {
    return axiosClient.put(ENDPOINT.EDIT_USER_PROFILE, { phoneNumber, note });
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
      fromAt: dayjs(fromAt).format(FORMAT_DATE.FORMAT_DATE_FOR_API_REQUEST),
      toAt: dayjs(toAt).format(FORMAT_DATE.FORMAT_DATE_FOR_API_REQUEST),
    });
  },
  getListAbsentRequest(filterTime, page, limit) {
    return axiosClient.get(
      ENDPOINT.GET_LIST_ABSENT_REQUEST(filterTime, page, limit),
    );
  },
  getAbsentRequestDetails(value, id) {
    return axiosClient.get(ENDPOINT.GET_ABSENT_REQUEST_DETAILS(id), value);
  },

  editAbsentRequest({ absentType, reasonType, description, fromAt, toAt }, id) {
    return axiosClient.put(ENDPOINT.EDIT_ABSENT_REQUEST(id), {
      absentType,
      reasonType,
      description,
      fromAt: dayjs(fromAt).format(FORMAT_DATE.FORMAT_DATE_FOR_API_REQUEST),
      toAt: dayjs(toAt).format(FORMAT_DATE.FORMAT_DATE_FOR_API_REQUEST),
    });
  },
};

export default userAPI;
