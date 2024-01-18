import React from "react";
import PropTypes from "prop-types";

import AppPicker from "@/components/apps/app-picker";

import { dataAvatar } from "@/constants/data/data-avatar";
import useAuthStore from "@/store/use-auth-store";

function AvatarList({ onSetAvatar }) {
  const user = useAuthStore().user;

  const [picker, setPicker] = React.useState(user.avatar);

  const onSetPicker = React.useCallback(
    (value) => {
      setPicker(value);

      onSetAvatar(value);
    },
    [onSetAvatar],
  );

  return (
    <div className="grid grid-cols-3 gap-3">
      {dataAvatar.map(({ avatar, alt, id }) => (
        <AppPicker
          key={id}
          onClick={onSetPicker}
          checked={picker === id}
          value={id}
        >
          <img className="relative rounded-[0.25rem]" src={avatar} alt={alt} />
        </AppPicker>
      ))}
    </div>
  );
}

export default AvatarList;

AvatarList.propTypes = {
  onSetAvatar: PropTypes.func.isRequired,
};
