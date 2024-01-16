import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import axiosClient from "@/services/memberApi";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (data) => {
        try {
          const {
            data: { payload: token },
          } = await axiosClient.post(`/client/auth/login`, data);
          const {
            data: { payload: userInfo },
          } = await axiosClient.get(`/client/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          set({ user: userInfo, token });
          return {
            ok: true,
            status: "success",
            message: "Login successful",
          };
        } catch (error) {
          return {
            ok: false,
            status: "error",
            message: error.response.data.message,
          };
        }
      },
      logout: async () => {
        window.localStorage.clear();
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export { useAuthStore };
