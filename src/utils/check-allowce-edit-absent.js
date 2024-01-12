import dayjs from "dayjs";

export default function onCheckIsEditAbsent(record) {
  return dayjs(new Date()).diff(dayjs(record), "hour") < 24;
}
