import { data } from "@/constants/data/data-head-absent-infor";

export default function onCheckRowAbsent(record) {
  return record.checkIn === data[3].text ? "bg-neutral-3" : "";
}
