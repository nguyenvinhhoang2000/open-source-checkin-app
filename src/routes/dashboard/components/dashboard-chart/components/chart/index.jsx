import React from "react";
import { Column } from "@ant-design/plots";

import AppToolTip from "@/components/apps/app-tooltip";

function DashBoardChart() {
  const [activeHover, setActiveHover] = React.useState(null);

  const onActiveHover = React.useCallback((event) => {
    setActiveHover(event.data.data);
  }, []);
  const onUnActiveHover = React.useCallback(() => {
    setActiveHover(null);
  }, []);

  const data = [
    { type: "Check-in Early", value: 20 },
    { type: "Check-in Later", value: 5 },
    { type: "Absent", value: 2 },
  ];
  const config = {
    data,
    xField: "type",
    yField: "value",
    axis: {
      x: {
        // SET NO TITLE
        title: false,

        // SET TICK
        tickLength: 18,
        tickStrokeOpacity: 0,

        // SET X LINE (TRUC HOANH)
        line: true,
        lineStrokeOpacity: 0.4,
        lineExtension: [0, 120],

        // SET GRID
        // grid: true,
        gridLength: 30,
      },
      y: {
        // SET NO TITLE
        title: false,

        // SET TICK
        tickLength: 15,
        tickStrokeOpacity: 0,

        // SET GRID
        gridFilter: (_, _index, record) => {
          record.filter((item) => item.label !== "0");
          return record;
        },

        grid: true,
      },
    },
    scale: {
      x: {
        align: 2.5,
        paddingInner: 1.5,
        paddingOuter: 0.1,
      },
      y: {
        type: "linear",
        domain: [0, 30],
      },
    },
    label: {
      text: "value",
      textBaseline: "bottom",
      background: true,
      opacity: 1,
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
      radiusTopLeft: 200,
      radiusTopRight: 200,
      fill: ({ value }) => {
        return value < 10 ? "#D9D9D9" : "#556EE6";
      },
      maxWidth: 20,
      marginRight: 50,
    },
    interaction: {
      tooltip: {
        disableNative: true,
      },
    },
    onReady: ({ chart }) => {
      chart.on("interval:pointerover", onActiveHover);
      chart.on("interval:pointerout", onUnActiveHover);
    },
    paddingLeft: 15,
    marginRight: 120,
    paddingBottom: 20,
    height: 254,
    legend: false,
  };
  return <Column {...config} />;
}

export default React.memo(DashBoardChart);
