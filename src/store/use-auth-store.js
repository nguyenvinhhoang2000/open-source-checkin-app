import cookie from "react-cookies";
import { create } from "zustand";

import { COOKIES_KEYS } from "@/constants/cookies-keys";
import { LOCATIONS } from "@/constants/routes";
import { TYPE_MESSAGE } from "@/constants/type-message";
import {
  removeAppAccessToken,
  setAppAccessToken,
} from "@/services/axiosConfig";
import userAPI from "@/services/userApi";
import onStoreResult from "@/utils/return-message";

import useAppMounted from "./use-app-mounted";

const useAuthStore = create((set, get) => ({
  user: null,
  onLogin: async (data) => {
    try {
      const {
        data: { payload: token, message },
      } = await userAPI.login(data);

      setAppAccessToken(token);

      get().onGetUserInformation();

      return onStoreResult(true, TYPE_MESSAGE.SUCCESS, message);
    } catch (error) {
      return onStoreResult(
        false,
        TYPE_MESSAGE.ERROR,
        error.response
          ? error.response.data.message
          : TYPE_MESSAGE.SYSTEM_ERROR,
      );
    }
  },
  onLogout: async () => {
    cookie.remove(COOKIES_KEYS.TOKEN, { path: LOCATIONS.LOGIN });

    // USER LOGOUT (MAKE SURE NO REDIRECT)
    useAppMounted.getState().onSetForceLogout(true);

    // REMOVE TOKEN
    removeAppAccessToken();

    set({ user: null });
  },
  onGetUserInformation: async () => {
    try {
      // SET TOKEN BEFORE CALL REQUEST
      const {
        data: { payload: user, message },
      } = await userAPI.getProfile();

      set({ user });

      return onStoreResult(true, TYPE_MESSAGE.SUCCESS, message);
    } catch (error) {
      return onStoreResult(
        false,
        TYPE_MESSAGE.ERROR,
        error.response
          ? error.response.data.message
          : TYPE_MESSAGE.SYSTEM_ERROR,
      );
    }
  },
}));

export default useAuthStore;
