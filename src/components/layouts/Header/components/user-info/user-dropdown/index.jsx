import React from "react";
import { Avatar, Button, Dropdown } from "antd";
import { useBoolean } from "usehooks-ts";

import { USER_DROPDOWN_KEY } from "@/constants/user-dropdown-key";

import EditAvatarDraw from "../edit-avatar";

function UserDropdown() {
  const { value: isOpenEditAvatar, setValue: setIsOpenEditAvatar } =
    useBoolean(false);

  const onOpenDraw = React.useCallback(
    (type) => {
      setIsOpenEditAvatar(type);
    },
    [setIsOpenEditAvatar],
  );

  const onMenuClick = React.useCallback(
    ({ key }) => {
      if (key === USER_DROPDOWN_KEY.EDIT_AVATAR) {
        setIsOpenEditAvatar(true);
      } else if (key === USER_DROPDOWN_KEY.LOG_OUT) {
        console.log(`🎶🎶🎶.. Log-out`);
      }
    },
    [setIsOpenEditAvatar],
  );

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
        <Button
          type="link"
          onClick={(e) => e.preventDefault()}
          className="flex flex-row items-center gap-2 p-0"
        >
          <Avatar
            size="small"
            shape="icon"
            className=" bg-volcano-2 text-volcano-6"
          >
            T
          </Avatar>
          <span className="font-roboto text-[1rem] font-normal leading-[1.375rem] text-black/85">
            Vinh Thai
          </span>
          <img src="/assets/icons/arrow-user-down.svg" alt="down" />
        </Button>
      </Dropdown>
      <EditAvatarDraw open={isOpenEditAvatar} onOpenDraw={onOpenDraw} />
    </div>
  );
}

export default UserDropdown;
