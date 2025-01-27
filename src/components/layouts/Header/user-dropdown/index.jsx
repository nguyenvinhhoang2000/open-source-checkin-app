import React from "react";
import { Avatar, Button, Dropdown } from "antd";
import { useBoolean } from "usehooks-ts";

import { dataAvatar } from "@/constants/data/data-avatar";
import { USER_DROPDOWN_KEY } from "@/constants/user-dropdown-key";
import useAuthStore from "@/store/use-auth-store";

import EditAvatarDraw from "../edit-avatar";

function UserDropdown() {
  const user = useAuthStore().user;
  const onLogout = useAuthStore().onLogout;

  const {
    value: isOpenEditAvatar,
    setTrue: setOpenEditAvatar,
    setFalse: setCloseEditAvatar,
  } = useBoolean(false);

  const onMenuClick = React.useCallback(
    ({ key }) => {
      switch (key) {
        case USER_DROPDOWN_KEY.EDIT_AVATAR:
          setOpenEditAvatar();
          break;

        case USER_DROPDOWN_KEY.LOG_OUT:
          onLogout();
          break;

        default:
          break;
      }
    },
    [onLogout, setOpenEditAvatar],
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

  const onRenderAvatar = React.useMemo(() => {
    return user?.avatar ? (
      <Avatar
        src={dataAvatar.find((item) => item.id === user.avatar).avatar}
        size="small"
      />
    ) : (
      <Avatar size="small" shape="icon" className="bg-volcano-2 text-volcano-6">
        {user.name.slice(0, 1)}
      </Avatar>
    );
  }, [user.avatar, user.name]);

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
          {onRenderAvatar}
          <span className="font-roboto text-[0.875rem] font-normal leading-[1.375rem] text-black/85">
            {user.name}
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
