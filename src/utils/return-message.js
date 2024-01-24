import { TYPE_MESSAGE } from "@/constants/type-message";

export const storeResult = {
  onSuccess(message, payload) {
    return {
      ok: true,
      status: TYPE_MESSAGE.SUCCESS,
      message,
      payload,
    };
  },

  onFail(message) {
    return {
      ok: false,
      status: TYPE_MESSAGE.ERROR,
      message: message || TYPE_MESSAGE.SYSTEM_ERROR,
    };
  },
};
