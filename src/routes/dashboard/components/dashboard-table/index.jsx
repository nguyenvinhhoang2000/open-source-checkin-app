import React from "react";

import AppHeaderTable from "@/components/apps/app-header-table";

import { defaultItemFilterTime } from "@/constants/default-item-filter-time";

import HistoryTable from "./table";

function DashboardTable() {
  const [filterTime, setFilterTime] = React.useState(
    defaultItemFilterTime[0].key,
  );

  const onFilterTime = React.useCallback((record) => {
    setFilterTime(record.key);
  }, []);
  return (
    <div className="flex flex-col gap-[1.25rem]">
      <AppHeaderTable
        title="Statistic"
        classNameTitle="font-medium text-[1.25rem] leading-[1.75rem] font-roboto"
        filterTime={filterTime}
        onFilterTime={onFilterTime}
      />
      <HistoryTable filterTime={filterTime} />
    </div>
  );
}

export default React.memo(DashboardTable);
