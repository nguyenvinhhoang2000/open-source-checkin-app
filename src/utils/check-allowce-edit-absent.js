import dayjs from "dayjs";

export default function onCheckIsEditAbsent(record) {
  return dayjs(new Date()).subtract(1, "day").isBefore(dayjs(record));
}
