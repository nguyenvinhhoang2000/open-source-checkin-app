import React from "react";

import HistoryTable from "./table";
import TableTitle from "./table-title";

function DashboardTable() {
  return (
    <div className="flex flex-col gap-[1.25rem]">
      <TableTitle />
      <HistoryTable />
    </div>
  );
}

export default React.memo(DashboardTable);
