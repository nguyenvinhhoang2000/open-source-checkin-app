import cookie from "react-cookies";
import axios from "axios";

import { COOKIES_KEYS } from "@/constants/local-storage-keys";
import { LOCATIONS } from "@/constants/routes";

const API_STATUS = {
  UNAUTHORIZED: 401,
};

const config = {
  baseURL: `${import.meta.env.VITE_API_URL}v1.0`,
  validateStatus: (status) => status >= 200 && status < 400,
  timeout: 60000,
};

function reloadApp() {
  cookie.remove(COOKIES_KEYS.TOKEN, { path: LOCATIONS.LOGIN });

  // force reload app, reset all state
  // window.location.replace(`${LOCATION.SIGN_IN}?redirect=${window.history.state.as}`);
}

const axiosClient = axios.create(config);

const createAuthToken = (token) => `Bearer ${token}`;

export function setAppAccessToken(token) {
  axiosClient.defaults.headers.Authorization = createAuthToken(token);
}

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    // EX: Handle 401 error
    if (response?.status === API_STATUS.UNAUTHORIZED) {
      reloadApp();
      return Promise.reject(error);
    }

    // EX: Handle other error
    return Promise.reject(error);
  },
);

export default axiosClient;
