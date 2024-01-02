import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Dropdown } from "antd";

import { USER_DROPDOWN_KEY } from "@/constants/userDropdownKey";

function UserDropdown() {
  const onMenuClick = React.useCallback(({ key }) => {
    if (key === USER_DROPDOWN_KEY.EDIT_AVATAR) {
      console.log(`🎶🎶🎶.. Edit avatar`);
    } else if (key === USER_DROPDOWN_KEY.LOG_OUT) {
      console.log(`🎶🎶🎶.. logout`);
    }
  }, []);

  const items = [
    {
      key: USER_DROPDOWN_KEY.EDIT_AVATAR,
      label: (
        <div className="flex flex-row items-center justify-start gap-2">
          <img src="/assets/icons/user-icon.svg" alt="Edit user" />
          <span>Edit Avatar</span>
        </div>
      ),
    },
    {
      key: USER_DROPDOWN_KEY.LOG_OUT,
      label: (
        <div className="flex flex-row items-center justify-start gap-2">
          <img src="/assets/icons/logout-icon.svg" alt="Edit user" />
          <span className="text-danger">Log-out</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-row justify-end">
      <Dropdown
        align={{ offset: [0, -24] }}
        menu={{
          items,
          onClick: onMenuClick,
        }}
        placement="topRight"
        trigger={["click"]}
        arrow
        overlayClassName="w-[11.9375rem]"
      >
        <Link
          to="/#"
          onClick={(e) => e.preventDefault()}
          className="flex flex-row items-center gap-2"
        >
          <Avatar className="flex h-6 w-6 items-center bg-volcano-2 text-volcano-6">
            T
          </Avatar>
          <span className="text-[1rem] font-normal text-black/85">
            Vinh Thai
          </span>
          <img src="/assets/icons/arrow-user-down.svg" alt="down" />
        </Link>
      </Dropdown>
    </div>
  );
}

export default UserDropdown;
