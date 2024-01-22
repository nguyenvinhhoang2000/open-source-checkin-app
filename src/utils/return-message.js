import { TYPE_MESSAGE } from "@/constants/type-message";

export const storeResult = {
  onSuccess(payload, message) {
    return {
      ok: true,
      status: TYPE_MESSAGE.SUCCESS,
      message: message || TYPE_MESSAGE.SYSTEM_ERROR,
      payload,
    };
  },

  onFail(payload, message) {
    return {
      ok: false,
      status: TYPE_MESSAGE.ERROR,
      message: message || TYPE_MESSAGE.SYSTEM_ERROR,
      payload,
    };
  },
};
