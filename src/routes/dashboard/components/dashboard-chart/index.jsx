import React from "react";

import Chart from "./components/chart";
import ChartTitle from "./components/chart-title";

function DashboardChart() {
  return (
    <div className="flex flex-col gap-6">
      <ChartTitle />
      <Chart />
    </div>
  );
}

export default React.memo(DashboardChart);
