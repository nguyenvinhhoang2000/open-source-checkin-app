import React, { useCallback } from "react";
import { Column } from "@ant-design/plots";

import AppToolTip from "@/components/apps/app-tooltip";

import { CHART_CONFIG_VALUE } from "@/constants/config-antd/chart";
import { dataChart } from "@/constants/data/data-chart";
import { createMedalLabel } from "@/utils/create-medal-label";

function DashBoardChart() {
  const chartRef = React.useRef(null);

  const [activeHover, setActiveHover] = React.useState(null);

  const onActiveHover = React.useCallback((event) => {
    setActiveHover(event.data.data);
  }, []);

  const onUnActiveHover = React.useCallback(() => {
    setActiveHover(null);
  }, []);

  const medal = useCallback((_datum, ranking) => {
    return createMedalLabel(chartRef, ranking);
  }, []);

  const config = {
    data: dataChart,
    xField: "type",
    yField: "value",
    axis: {
      x: {
        ...CHART_CONFIG_VALUE.axis.x,
        labelFormatter: (datum, index) => medal(datum, index),
      },
      y: {
        ...CHART_CONFIG_VALUE.axis.y,
      },
    },
    scale: CHART_CONFIG_VALUE.scale,
    label: {
      ...CHART_CONFIG_VALUE.label,
      render: (_, record) => {
        return (
          <div className="-ml-2 -mt-3">
            {record.type === activeHover?.type &&
              record.value === activeHover?.value && (
                <AppToolTip
                  colorToolTip={record.value < 10 ? "chart-2" : "chart-1"}
                  content={record.value}
                  position="top"
                >
                  <div />
                </AppToolTip>
              )}
          </div>
        );
      },
    },
    style: {
      ...CHART_CONFIG_VALUE.style,
      fill: ({ value }) => {
        return value > 10
          ? CHART_CONFIG_VALUE.style.colors["chart-1"]
          : CHART_CONFIG_VALUE.style.colors["chart-2"];
      },
    },
    interaction: CHART_CONFIG_VALUE.interaction,
    ...CHART_CONFIG_VALUE.other,
    onReady: (plot) => {
      chartRef.current = plot;
      plot.chart.on("interval:pointerover", onActiveHover);
      plot.chart.on("interval:pointerout", onUnActiveHover);
    },
  };

  return <Column {...config} />;
}

export default React.memo(DashBoardChart);
