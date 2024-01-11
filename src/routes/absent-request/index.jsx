import React from "react";

import AppHeaderTable from "@/components/apps/app-header-table";

import { defaultItemFilterTime } from "@/constants/default-item-filter-time";

import AbsentTable from "./components/absent-table";

function AbsentRequestTable() {
  const [filterTime, setFilterTime] = React.useState(
    defaultItemFilterTime[0].key,
  );
  const onFilterTime = React.useCallback((record) => {
    setFilterTime(record.key);
  }, []);
  return (
    <section className="container mt-[1.25rem] flex flex-col gap-6 rounded-xl bg-white p-5 shadow-dropShadow">
      <AppHeaderTable
        title="Your Absent Request"
        classNameTitle="font-medium text-[1.25rem] leading-[1.75rem] font-roboto"
        filterTime={filterTime}
        buttonAbsentRequestText="Absent Request"
        onFilterTime={onFilterTime}
      />
      <AbsentTable filterTime={filterTime} />
    </section>
  );
}

export default React.memo(AbsentRequestTable);
