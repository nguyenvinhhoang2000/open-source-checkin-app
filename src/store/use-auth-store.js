import cookie from "react-cookies";
import { create } from "zustand";

import { COOKIES_KEYS } from "@/constants/local-storage-keys";
import { LOCATIONS } from "@/constants/routes";
import { TYPE_MESSAGE } from "@/constants/type-message";
import axiosClient from "@/services/memberApi";

const useAuthStore = create(
  (set) => ({
    user: null,
    token: null,
    onSignin: async (data) => {
      try {
        const {
          data: { payload: token, message },
        } = await axiosClient.post(`/client/auth/login`, data);

        cookie.save("token", token, {
          path: LOCATIONS.LOGIN,
          // One day
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        return {
          ok: true,
          status: TYPE_MESSAGE.SUCCESS,
          message,
        };
      } catch (error) {
        return {
          ok: false,
          status: TYPE_MESSAGE.ERROR,
          message: error.response.data.message,
        };
      }
    },
    onSignout: async () => {
      cookie.remove(COOKIES_KEYS.TOKEN, { path: LOCATIONS.LOGIN });
      window.location.replace(LOCATIONS.LOGIN);

      set({ user: null, token: null });
    },
    onGetUserInfo: async (user) => {
      set({ user });
    },
  }),
  {
    name: "auth-storage",
  },
);

export { useAuthStore };
