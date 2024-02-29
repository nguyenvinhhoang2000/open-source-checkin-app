import {
  CHECK_IN_OUT_STATUS,
  CHECK_IN_OUT_TYPE,
} from "@/constants/check-in-out";

export const renderContent = (status, type) => {
  if (type === CHECK_IN_OUT_TYPE.CHECKIN) {
    switch (status) {
      case CHECK_IN_OUT_STATUS.EARLY:
        return "Check-in Early";

      case CHECK_IN_OUT_STATUS.LATE:
        return "Check-in Late";

      case CHECK_IN_OUT_STATUS.ABSENT:
        return "Description";

      default:
        return null;
    }
  } else {
    switch (status) {
      case CHECK_IN_OUT_STATUS.EARLY:
        return "Check-out Early";

      case CHECK_IN_OUT_STATUS.LATE:
        return "Check-out Late";

      case CHECK_IN_OUT_STATUS.ABSENT:
        return "Description";

      default:
        return null;
    }
  }
};
