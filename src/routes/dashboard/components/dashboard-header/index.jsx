import React from "react";

import HeadAbsentInfor from "./head-absent-infor";
import Checkin from "./head-checkin";
import HeadDateLocation from "./head-date-location";
import HeadShortProfile from "./head-short-profile";

function DashboardHead() {
  return (
    <div className="mt-[1.5rem] grid grid-cols-1 rounded-lg bg-secondary-1 p-[1.25rem] md:grid-cols-2 lg:flex lg:justify-between ">
      <HeadShortProfile />
      <span className="bg-neutral-6 hidden max-h-[4.125rem] w-[0.0625rem] rounded lg:block" />
      <HeadAbsentInfor />
      <span className="bg-neutral-6 hidden max-h-[4.125rem] w-[0.0625rem] rounded lg:block  " />
      <HeadDateLocation />
      <div className="flex md:justify-end">
        <Checkin />
      </div>
    </div>
  );
}
export default DashboardHead;
