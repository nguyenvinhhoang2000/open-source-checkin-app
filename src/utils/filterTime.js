import { defaultItemFilterTime } from "@/constants/defaultItemFilterTime";

const filterDataAbsent = (time, data) => {
  const timer = new Date();

  const thisYear = timer.getFullYear().toString();

  const thisMonth = `${timer.getMonth() + 1}-${timer.getFullYear()}`;

  const lastMonth = `${timer.getMonth()}-${timer.getFullYear()}`;

  const lastThreeMonth = timer.getMonth() - 1;

  switch (time) {
    case defaultItemFilterTime[0]?.key: {
      const newData = data.filter((item) => {
        return item.dateRequest.slice(3, 10).toString() === thisMonth;
      });

      return newData;
    }

    case defaultItemFilterTime[1]?.key: {
      const newData = data.filter((item) => {
        return item.dateRequest.slice(3, 10).toString() === lastMonth;
      });

      return newData;
    }

    case defaultItemFilterTime[2]?.key: {
      const newData = data.filter((item) => {
        return (
          item.dateRequest.slice(6, 10).toString() === thisYear &&
          +item.dateRequest.slice(3, 5) >= lastThreeMonth &&
          +item.dateRequest.slice(3, 5) <= lastThreeMonth + 3
        );
      });

      return newData;
    }

    default:
      return data;
  }
};
export { filterDataAbsent };
