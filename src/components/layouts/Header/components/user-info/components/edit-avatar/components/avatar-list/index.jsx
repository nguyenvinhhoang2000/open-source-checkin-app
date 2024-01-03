import React from "react";

import AppPicker from "@/components/apps/app-picker";

import { dataAvatar } from "@/constants/data/dataAvatar";

function AvatarList() {
  const [picker, setPicker] = React.useState("avatar-edit-1");

  const onSetPicker = React.useCallback((value) => {
    setPicker(value);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {dataAvatar.map(({ avatar, alt }) => (
        <AppPicker
          key={alt}
          onClick={onSetPicker}
          checked={picker === alt}
          value={alt}
        >
          <img className="relative rounded-[0.25rem]" src={avatar} alt={alt} />
        </AppPicker>
      ))}
    </div>
  );
}

export default AvatarList;
