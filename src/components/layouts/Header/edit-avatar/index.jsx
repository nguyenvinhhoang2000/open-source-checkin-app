import React from "react";
import { Drawer, message } from "antd";
import PropTypes from "prop-types";
import { useBoolean } from "usehooks-ts";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import useAuthStore from "@/store/use-auth-store";
import { fullConfig } from "@/theme";

import AvatarList from "../avatar-list";

function EditAvatarDraw({ openDraw, onCloseDraw }) {
  const onChangeAvatar = useAuthStore().onChangeAvatar;

  const [avatarPicked, setAvatarPicked] = React.useState();

  const {
    value: isLoadingOk,
    setTrue: setShowLoadingOk,
    setFalse: setHideLoadingOk,
  } = useBoolean(false);

  const onSumbit = React.useCallback(async () => {
    setShowLoadingOk();

    const { status, message: resultMessage } =
      await onChangeAvatar(avatarPicked);

    message[status](resultMessage, 1);

    onCloseDraw();

    setHideLoadingOk();
  }, [avatarPicked]); // eslint-disable-line

  const onSetAvatarPicked = React.useCallback((value) => {
    setAvatarPicked(value);
  }, []);

  return (
    <Drawer
      width={fullConfig.theme.width.drawWidth}
      keyboard="false"
      placement="right"
      onClose={onCloseDraw}
      open={openDraw}
      mask
      title={<AppTitlePopup titleText="Change Avatar" onClose={onCloseDraw} />}
      closable={false}
      footer={
        <AppFooterPopup
          cancelText="Cancel"
          okText="Save"
          onOk={onSumbit}
          onCancel={onCloseDraw}
          isLoadingButtonOk={isLoadingOk}
        />
      }
    >
      <AvatarList onSetAvatar={onSetAvatarPicked} />
    </Drawer>
  );
}

export default React.memo(EditAvatarDraw);

EditAvatarDraw.propTypes = {
  openDraw: PropTypes.bool.isRequired,
  onCloseDraw: PropTypes.func.isRequired,
};
