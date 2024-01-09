import dayjs from "dayjs";

import { TIME_WORKING } from "@/constants/time-working";

export default function checkLate(text, type) {
  const checkTime = dayjs(
    `${dayjs(text).format("YYYY-MM-DD")} ${TIME_WORKING[type].time}`,
  );
  const isLate = dayjs(text).isAfter(checkTime);
  return {
    isLate,
    type: isLate ? TIME_WORKING[type].late : TIME_WORKING[type].early,
  };
}
