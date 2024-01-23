import { TYPE_MESSAGE } from "@/constants/type-message";

export const storeResult = {
  onSuccess(message) {
    return {
      ok: true,
      status: TYPE_MESSAGE.SUCCESS,
      message: message || TYPE_MESSAGE.SYSTEM_ERROR,
    };
  },

  onFail(message, messArr) {
    return {
      ok: false,
      status: TYPE_MESSAGE.ERROR,
      message: message || TYPE_MESSAGE.SYSTEM_ERROR,
      messArr,
    };
  },
};
