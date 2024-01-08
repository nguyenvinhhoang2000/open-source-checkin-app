import React from "react";

import DashboardHead from "./components/dashboard-header/index";
import DashboardTable from "./components/dashboard-table/index";

function Dashboard() {
  return (
    <section className="container">
      <DashboardHead />
      <DashboardTable />
    </section>
  );
}

export default Dashboard;
