import { dataChart } from "@/constants/data/data-chart";

export const createMedalLabel = (chartRef, ranking) => {
  const { chart } = chartRef.current;
  const { document } = chart.getContext().canvas;
  const group = document?.createElement("g", {});

  const text =
    chart?._width > 320
      ? dataChart.map((item) => item.type)[ranking]
      : dataChart.map((item) => item.type.replace("Check-in ", ""))[ranking];

  const label = document.createElement("text", {
    style: {
      text,
      fill: "black",
      opacity: 0.25,
      textAlign: "center",
      transform: `translate(0, 10)`,
      font: "Roboto",
      fontSize: chart?._width > 300 ? 12 : 8,
    },
  });

  group.appendChild(label);
  return group;
};
