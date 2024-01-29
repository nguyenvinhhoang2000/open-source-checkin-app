import { create } from "zustand";

import userAPI from "@/services/userApi";
import { storeResult } from "@/utils/return-message";

const useUserProfileStore = create((set, get) => ({
  user: null,

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
}));

export default useUserProfileStore;
