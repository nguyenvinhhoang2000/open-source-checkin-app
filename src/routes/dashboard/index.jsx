import React from "react";

import DashBoardChart from "./components/dashboard-chart";
import DashboardHead from "./components/dashboard-header/index";

function Dashboard() {
  return (
    <section className="container">
      <DashboardHead />

      <div className="flex flex-col gap-6 md:flex md:flex-row md:gap-6">
        <div className="flex flex-col gap-6 sm:flex sm:w-full sm:flex-row sm:gap-6 md:flex md:w-full md:max-w-[26.375rem] md:flex-col md:gap-6">
          <div className="min-h-[21.75rem] w-full rounded-lg bg-white p-5 shadow-dropShadow sm:w-1/2 md:w-full">
            <DashBoardChart />
          </div>
          <div className="min-h-[26.5625rem] w-full rounded-lg bg-white p-5 shadow-dropShadow sm:w-1/2 md:w-full">
            2
          </div>
        </div>
        <div className="w-full rounded-lg bg-white p-5 shadow-dropShadow md:max-w-[57.125rem]">
          3
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
