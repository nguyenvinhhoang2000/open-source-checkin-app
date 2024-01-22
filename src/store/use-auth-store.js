import { create } from "zustand";

import {
  removeAppAccessToken,
  setAppAccessToken,
} from "@/services/axiosConfig";
import userAPI from "@/services/userApi";
import { storeResult } from "@/utils/return-message";

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

      return storeResult.onSuccess(message);
    } catch (error) {
      return storeResult.onFail(error.response?.data?.message);
    }
  },

  onLogout: async () => {
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

      return storeResult.onSuccess(message);
    } catch (error) {
      return storeResult.onFail(error.response?.data?.message);
    }
  },

  onChangeAvatar: async (data) => {
    try {
      const {
        data: { message },
      } = await userAPI.changeAvatar(data);

      await get().onGetUserInformation();

      return storeResult.onSuccess(message);
    } catch (error) {
      return storeResult.onFail(error.response?.data?.errors?.msg);
    }
  },

  onSetProfile: async (data) => {
    try {
      const {
        data: { message },
      } = await userAPI.editProfile(data);

      await get().onGetUserInformation();

      return storeResult.onSuccess(message);
    } catch (error) {
      return storeResult.onFail(error.response?.data?.errors?.msg);
    }
  },

  onCreateAbsentRequest: async (data) => {
    try {
      const {
        data: { message },
      } = await userAPI.createAbsentRequest(data);

      return storeResult.onSuccess(message);
    } catch (error) {
      return storeResult.onFail(error.response?.data?.errors?.msg);
    }
  },
}));

export default useAuthStore;
