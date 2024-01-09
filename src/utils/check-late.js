import dayjs from "dayjs";

import { TIME_WORKING } from "@/constants/time-working";

export default function checkLate(text, type) {
  const currentTime = dayjs(text);
  const checkTime = dayjs(
    `${dayjs(text).format("YYYY-MM-DD")} ${TIME_WORKING[type].time}`,
  );
  const isLate = currentTime.isAfter(checkTime);
  switch (type) {
    case "in":
      return {
        isLate,
        type: isLate ? TIME_WORKING[type].late : TIME_WORKING[type].early,
      };
    case "out":
      return {
        isLate,
        type: isLate ? TIME_WORKING[type].late : TIME_WORKING[type].early,
      };
    default:
      return { error: "Unknown type" };
  }
}
