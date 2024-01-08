import dayjs from "dayjs";

import { TIME_WORKING } from "@/constants/time-working";

export default function checkLate(text, type) {
  const currentTime = dayjs(text);
  const checkTime = dayjs(
    `${dayjs(text).format("YYYY-MM-DD")} ${TIME_WORKING[type].time}`,
  );

  const isLate = currentTime.isAfter(checkTime);

  return type === Object.keys(TIME_WORKING)[0] ? isLate : !isLate;
}
