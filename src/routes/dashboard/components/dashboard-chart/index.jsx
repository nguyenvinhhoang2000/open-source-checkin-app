import React from "react";

import AppHeaderTable from "@/components/apps/app-header-table";

import { defaultItemFilterTime } from "@/constants/default-item-filter-time";

import Chart from "./chart";

function DashboardChart() {
  const [filterTime, setFilterTime] = React.useState(
    defaultItemFilterTime[0].key,
  );

  const onFilterTime = React.useCallback((record) => {
    setFilterTime(record.key);
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <AppHeaderTable
        title="Thống kê"
        classNameTitle="font-medium text-[1.25rem] leading-[1.75rem] font-roboto"
        filterTime={filterTime}
        onFilterTime={onFilterTime}
      />
      <Chart filterTime={filterTime} />
    </div>
  );
}

export default React.memo(DashboardChart);
