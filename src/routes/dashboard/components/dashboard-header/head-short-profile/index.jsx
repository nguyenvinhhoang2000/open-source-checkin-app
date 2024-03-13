import React from "react";
import { Avatar } from "antd";

import { dataAvatar } from "@/constants/data/data-avatar";
import useAuthStore from "@/store/use-auth-store";

function HeadShortProfile() {
  const user = useAuthStore().user;
  return (
    <div className="flex gap-[0.75rem]">
      {user.avatar ? (
        <Avatar
          src={dataAvatar.find((item) => item.id === user.avatar).avatar}
          size={64}
          alt="avatar"
        />
      ) : (
        <Avatar size={64} shape="icon" className="bg-volcano-2 text-volcano-6">
          {user.name.slice(0, 1)}
        </Avatar>
      )}

      <div className="flex flex-col justify-center font-roboto">
        <h4 className="text-xl font-medium text-character-1">{user?.name}</h4>
        <span className="text-sm font-normal leading-[1.375rem] text-character-2">
          {user?.position}
        </span>
      </div>
    </div>
  );
}

export default React.memo(HeadShortProfile);
