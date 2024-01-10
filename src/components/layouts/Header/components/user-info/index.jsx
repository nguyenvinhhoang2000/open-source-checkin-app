import React from "react";

import NavigationDraw from "../navigation-draw";

import UserDropdown from "./user-dropdown";

function UserInfo() {
  return (
    <div className="flex flex-row gap-2">
      <div className="hidden sm:flex sm:flex-row sm:items-center sm:gap-2">
        <UserDropdown />
      </div>
      <div className="md:hidden">
        <NavigationDraw />
      </div>
    </div>
  );
}

export default UserInfo;
