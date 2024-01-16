import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown } from "antd";
import { useBoolean } from "usehooks-ts";

import { LOCATIONS } from "@/constants/routes";
import { USER_DROPDOWN_KEY } from "@/constants/user-dropdown-key";
import { useAuthStore } from "@/store/use-auth-store";

import EditAvatarDraw from "../edit-avatar";

function UserDropdown() {
  const {
    value: isOpenEditAvatar,
    setTrue: setOpenEditAvatar,
    setFalse: setCloseEditAvatar,
  } = useBoolean(false);
  const navigate = useNavigate();
  const { onSignout } = useAuthStore();
  const onMenuClick = React.useCallback(
    ({ key }) => {
      if (key === USER_DROPDOWN_KEY.EDIT_AVATAR) {
        setOpenEditAvatar();
      } else if (key === USER_DROPDOWN_KEY.LOG_OUT) {
        onSignout();
        navigate(LOCATIONS.LOGIN);
      }
    },
    [onSignout, navigate, setOpenEditAvatar],
  );

  const menu = React.useMemo(() => {
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
    return {
      items,
      onClick: onMenuClick,
    };
  }, [onMenuClick]);
  return (
    <div className="flex flex-row justify-end">
      <Dropdown
        align={{ offset: [0, -24] }}
        menu={menu}
        placement="topRight"
        trigger={["click"]}
        arrow
        overlayClassName="w-[11.9375rem]"
      >
        <Button
          type="text"
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
          <span className="font-roboto text-[0.875rem] font-normal leading-[1.375rem] text-black/85">
            Vinh Thai
          </span>
          <img src="/assets/icons/arrow-user-down.svg" alt="down" />
        </Button>
      </Dropdown>
      <EditAvatarDraw
        openDraw={isOpenEditAvatar}
        onCloseDraw={setCloseEditAvatar}
      />
    </div>
  );
}

export default UserDropdown;
