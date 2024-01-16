import axios from "axios";

import { LOCAL_STORAGE_KEYS } from "@/constants/local-storage-keys";

const API_STATUS = {
  UNAUTHORIZED: 401,
};

const config = {
  baseURL: `${import.meta.env.VITE_API_URL}/v1.0`,
  validateStatus: (status) => status >= 200 && status < 400,
  timeout: 60000,
};

let isRefreshing = false;
let failedQueue = [];

// EX: Push callback to failedQueue for retry request
function addFailedQueue(cb) {
  failedQueue.push(cb);
}

function processFailedQueue(token) {
  failedQueue.map((cb) => cb(token));
  failedQueue = [];
}

function reloadApp() {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);

  isRefreshing = false;
  failedQueue = [];
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
    const { config: originalRequest, response } = error;

    // EX: Handle 401 error
    if (response?.status === API_STATUS.UNAUTHORIZED) {
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);

      // EX: Check if token is expired
      if (!token) {
        reloadApp();
        return Promise.reject(error);
      }

      // EX: Check if token is refreshing
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshResponse = await axios({
            ...config,
            method: "post",
            url: "/auth/refresh",
            data: { token },
          });

          const newAccessToken = refreshResponse.data.payload;

          localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, newAccessToken);

          isRefreshing = false;

          setAppAccessToken(newAccessToken);

          // EX: Add callback to failedQueue for retry request and process it
          return new Promise((resolve) => {
            addFailedQueue((newToken) => {
              originalRequest.headers.Authorization = createAuthToken(newToken);

              resolve(axiosClient(originalRequest));
            });

            processFailedQueue(newAccessToken);
          });
        } catch (_e) {
          reloadApp();
          return Promise.reject(error);
        }
      }

      // EX: ONLY add callback to failedQueue for retry request
      return new Promise((resolve) => {
        addFailedQueue((newToken) => {
          originalRequest.headers.Authorization = createAuthToken(newToken);

          resolve(axiosClient(originalRequest));
        });
      });
    }

    // EX: Handle other error
    return Promise.reject(error);
  },
);

export default axiosClient;
