import dayjs from "dayjs";

import { defaultItemFilterTime } from "@/constants/defaultItemFilterTime";

const filterDataAbsent = (time, data) => {
  const currentDate = dayjs();

  const lastMont = currentDate.subtract(1, "month");

  const threeMonthsAgo = currentDate.subtract(3, "month");

  switch (time) {
    case defaultItemFilterTime[0]?.key: {
      const newData = data.filter((item) => {
        const targetDate = dayjs(item.dateRequest);
        return targetDate.isSame(currentDate, "month");
      });

      return newData;
    }

    case defaultItemFilterTime[1]?.key: {
      const newData = data.filter((item) => {
        const targetDate = dayjs(item.dateRequest);
        return targetDate.isSame(lastMont, "month");
      });

      return newData;
    }

    case defaultItemFilterTime[2]?.key: {
      const newData = data.filter((item) => {
        const targetDate = dayjs(item.dateRequest);
        return (
          targetDate.isAfter(threeMonthsAgo) && targetDate.isBefore(currentDate)
        );
      });

      return newData;
    }

    default:
      return data;
  }
};

export { filterDataAbsent };
