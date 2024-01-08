import { dataChart, domainValue } from "@/constants/data/data-chart";
import { fullConfig } from "@/theme";

export const CHART_CONFIG_VALUE = {
  data: dataChart,
  field: {
    xField: Object.keys(dataChart[0])[0],
    yField: Object.keys(dataChart[0])[1],
  },
  axis: {
    x: {
      tickLength: 18,
      tickStrokeOpacity: 0,
      line: true,
      lineStrokeOpacity: 0.4,
      lineExtension: [0, 120],
      gridLength: 30,
    },
    y: {
      tickLength: 15,
      tickStrokeOpacity: 0,
      grid: true,
    },
  },
  scale: {
    x: {
      type: "band",
      align: 1.5,
      paddingInner: 1.8,
      paddingOuter: 0.2,
    },
    y: {
      type: "linear",
      domain: domainValue,
    },
  },
  label: {
    text: "value",
    textBaseline: "bottom",
    background: true,
    opacity: 1,
  },
  style: {
    radiusTopLeft: 200,
    radiusTopRight: 200,
    colors: {
      "chart-1": fullConfig.theme.colors.chart[1],
      "chart-2": fullConfig.theme.colors.chart[2],
    },
    maxWidth: 20,
    marginRight: 50,
  },
  interaction: {
    tooltip: {
      disableNative: true,
    },
    elementHighlightByColor: false,
  },
  other: {
    paddingLeft: 15,
    marginRight: 120,
    paddingBottom: 20,
    height: 254,
    legend: false,
  },
};
