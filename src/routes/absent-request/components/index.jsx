import React from "react";

import AppHeaderTable from "@/components/apps/app-header-table";

import { defaultItemFilterTime } from "@/constants/default-item-filter-time";

import AbsentTable from "./absent-table";

function AbsentRequestTable() {
  const [filterTime, setFilterTime] = React.useState(
    defaultItemFilterTime[0].key,
  );
  const onFilterTime = React.useCallback((record) => {
    setFilterTime(record.key);
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <AppHeaderTable
        title="Your Absent Request"
        classNameTitle="font-medium text-[1.25rem] leading-[1.75rem] font-roboto"
        filterTime={filterTime}
        buttonSendText="Absent Request"
        onFilterTime={onFilterTime}
      />
      <AbsentTable filterTime={filterTime} />
    </div>
  );
}

export default React.memo(AbsentRequestTable);
