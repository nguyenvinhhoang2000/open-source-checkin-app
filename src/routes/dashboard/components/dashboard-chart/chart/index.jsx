import React from "react";
import { Column } from "@ant-design/plots";

import AppTooltip from "@/components/apps/app-tooltip";

import { CHART_CONFIG_VALUE } from "@/constants/config-antd/chart";

function DashBoardChart() {
  const [activeHover, setActiveHover] = React.useState(null);
  const onActiveHover = React.useCallback((event) => {
    setActiveHover(event.data.data);
  }, []);

  const onUnActiveHover = React.useCallback(() => {
    setActiveHover(null);
  }, []);

  const config = React.useMemo(() => {
    return {
      data: CHART_CONFIG_VALUE.data,
      ...CHART_CONFIG_VALUE.field,
      axis: {
        x: {
          ...CHART_CONFIG_VALUE.axis.x,
        },
        y: {
          ...CHART_CONFIG_VALUE.axis.y,
        },
      },
      scale: CHART_CONFIG_VALUE.scale,
      label: {
        ...CHART_CONFIG_VALUE.label,

        render: (_, record) => (
          <div className="-ml-2 -mt-3">
            {record.type === activeHover?.type &&
              record.value === activeHover?.value && (
                <AppTooltip
                  colorToolTip={record.value < 10 ? "2" : "1"}
                  content={record.value}
                  position="top"
                >
                  <div />
                </AppTooltip>
              )}
          </div>
        ),
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
        plot.chart.on("interval:pointerover", onActiveHover);
        plot.chart.on("interval:pointerout", onUnActiveHover);
      },
    };
  }, [activeHover?.type, activeHover?.value, onActiveHover, onUnActiveHover]);

  return <Column {...config} />;
}

export default React.memo(DashBoardChart);
