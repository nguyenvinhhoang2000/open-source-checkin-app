export const dataChart = [
  { type: "Check-in Early", value: 20 },
  { type: "Check-in Later", value: 5 },
  { type: "Absent", value: 3 },
];
const extraValue = 10;
export const domainValue = [
  0,
  Math.max(...dataChart.map((item) => item.value)) + extraValue,
];
