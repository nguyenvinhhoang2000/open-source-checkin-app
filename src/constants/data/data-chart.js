import { data } from "./data-head-absent-infor";

export const dataChart = [
  { type: data[1].text, value: 20 },
  { type: data[2].text, value: 5 },
  { type: data[3].text, value: 3 },
];
const extraValue = 10;
export const domainValue = [
  0,
  Math.max(...dataChart.map((item) => item.value)) + extraValue,
];
