// FIXME: 1. viết hết endpoint của api
const ENDPOINT = {
  // USER
  LOGIN: "/client/auth/login",

  GET_USER_PROFILE: "/client/user",

  EDIT_USER_PROFILE: "/client/user/change-info",

  CHANGE_USER_AVATAR: "/client/user/change-avatar",

  // ABSENT REQUEST

  CREATE_ABSENT_REQUEST: "/client/absent-requests/create",

  GET_LIST_ABSENT_REQUEST: "/client/absent-requests",

  GET_ABSENT_REQUEST_DETAILS: (id) => `/client/absent-requests/${id}`,

  EDIT_ABSENT_REQUEST: (id) => `/client/absent-requests/${id}`,
};

export default ENDPOINT;
