import {
  CHECK_IN_OUT_STATUS,
  CHECK_IN_OUT_TYPE,
} from "@/constants/check-in-out";

export const renderContent = (status, type) => {
  if (type === CHECK_IN_OUT_TYPE.CHECKIN) {
    switch (status) {
      case CHECK_IN_OUT_STATUS.EARLY:
        return "Check-in Sớm";

      case CHECK_IN_OUT_STATUS.LATE:
        return "Check-in Trễ";

      case CHECK_IN_OUT_STATUS.ABSENT:
        return "Mô tả";

      default:
        return null;
    }
  } else {
    switch (status) {
      case CHECK_IN_OUT_STATUS.EARLY:
        return "Check-out Sớm";

      case CHECK_IN_OUT_STATUS.LATE:
        return "Check-out Trễ";

      case CHECK_IN_OUT_STATUS.ABSENT:
        return "Mô tả";

      default:
        return null;
    }
  }
};
