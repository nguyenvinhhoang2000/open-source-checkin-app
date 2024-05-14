const ENDPOINT = {
  // USER
  LOGIN: "auth/login",

  GET_USER_PROFILE: "user",

  EDIT_USER_PROFILE: "user/change-info",

  CHANGE_USER_AVATAR: "user/change-avatar",

  // ABSENT REQUEST

  CREATE_ABSENT_REQUEST: "absent-requests/create",

  GET_LIST_ABSENT_REQUEST: (filterTime, page, limit) =>
    `/client/absent-requests?period=${filterTime}&page=${page}&limit=${limit}`,

  GET_ABSENT_REQUEST_DETAILS: (id) => `/client/absent-requests/${id}`,

  EDIT_ABSENT_REQUEST: (id) => `/client/absent-requests/${id}`,

  // WORKING
  GET_WORKING_STATISTIC: (filterTime) =>
    `/client/workings/statistics?period=${filterTime}`,

  GET_WORKING_HISTORY: (filterTime, limit, page) =>
    `/client/workings/histories?limit=${limit}&page=${page}&period=${filterTime}`,
};

export default ENDPOINT;
