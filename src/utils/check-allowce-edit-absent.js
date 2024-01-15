import dayjs from "dayjs";

export default function onCheckIsEditAbsent(record) {
  return dayjs(new Date()).isBefore(dayjs(record));
}
