import React from "react";
import { useSearchParams } from "react-router-dom";

import AppHeaderTable from "@/components/apps/app-header-table";

import useWorkingStatisticStore from "@/store/use-working-store";

import HistoryTable from "./table";

function DashboardTable() {
  const onGetWorkingHistory = useWorkingStatisticStore().onGetWorkingHistory;
  const onClearListWorkingHistory =
    useWorkingStatisticStore().onClearListWorkingHistory;

  const filterTimeWorkingHistory =
    useWorkingStatisticStore().filterTimeWorkingHistory;

  const [searchParams, setSearchParams] = useSearchParams();

  const onFilterTime = React.useCallback(
    (record) => {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        filterTime: record.key,
        page: 1,
      });
    },
    [searchParams, setSearchParams],
  );

  React.useEffect(() => {
    onGetWorkingHistory(
      searchParams.get("filterTime"),
      searchParams.get("page"),
    );
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    return () => {
      onClearListWorkingHistory();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-[1.25rem]">
      <AppHeaderTable
        title="History"
        classNameTitle="font-medium text-[1.25rem] leading-[1.75rem] font-roboto"
        filterTime={filterTimeWorkingHistory}
        onFilterTime={onFilterTime}
      />
      <HistoryTable />
    </div>
  );
}

export default React.memo(DashboardTable);
