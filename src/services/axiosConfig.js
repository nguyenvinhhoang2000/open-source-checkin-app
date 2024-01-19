import cookie from "react-cookies";
import axios from "axios";

import { COOKIES_KEYS } from "@/constants/cookies-keys";
import { LOCATIONS } from "@/constants/routes";

const API_STATUS = {
  UNAUTHORIZED: 401,
};

const config = {
  baseURL: `${import.meta.env.VITE_API_URL}v1.0`,
  validateStatus: (status) => status >= 200 && status < 400,
  timeout: 60000,
};

const axiosClient = axios.create(config);

const createAuthToken = (token) => `Bearer ${token}`;

export function setAppAccessToken(token) {
  cookie.save(COOKIES_KEYS.TOKEN, token, {
    path: LOCATIONS.LOGIN,
    // EX: Set time of cookie in 1 day
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  axiosClient.defaults.headers.Authorization = createAuthToken(token);
}

export function removeAppAccessToken() {
  cookie.remove(COOKIES_KEYS.TOKEN, { path: LOCATIONS.LOGIN });

  delete axiosClient.defaults.headers.Authorization;

  window.location.replace(LOCATIONS.LOGIN);
}

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    // EX: Handle 401 error && delete old/invalid token
    if (response?.status === API_STATUS.UNAUTHORIZED) {
      removeAppAccessToken();
    }

    // EX: Handle other error
    return Promise.reject(error);
  },
);

export default axiosClient;
