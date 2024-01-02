import React from "react";
import { Drawer } from "antd";
import PropTypes from "prop-types";

import AppFooterDraw from "@/components/apps/app-footer-draw";
import AppTitleDraw from "@/components/apps/app-title-draw";

import { fullConfig } from "@/theme";

import AvatarList from "./components/avatar-list";

function EditAvatarDraw({ open, onOpenDraw }) {
  const [loadingOk, setLoadingOk] = React.useState(false);

  const onClose = React.useCallback(() => {
    onOpenDraw(false);
  }, [onOpenDraw]);

  const onSumbit = React.useCallback(async () => {
    await setLoadingOk(true);
    // HANDLE SUBMIT
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(`🎶🎶🎶.. AWAIT SUBMIT OKAY THEN CLOSE`);
        resolve();
      }, 2000);
    });
    await setLoadingOk(false);
    await onOpenDraw(false);
  }, [onOpenDraw]);

  const renderFooter = React.useMemo(() => {
    return (
      <AppFooterDraw
        cancleText="Cancel"
        okText="Save"
        onOk={onSumbit}
        onCancle={onClose}
        classNames="flex flex-row justify-end gap-2"
        loadingButtonOk={loadingOk}
      />
    );
  }, [loadingOk, onClose, onSumbit]);

  const renderTitle = React.useMemo(() => {
    return <AppTitleDraw titleText="Change Avatar" onClose={onClose} />;
  }, [onClose]);

  return (
    <Drawer
      width={fullConfig.theme.width.drawWidth}
      keyboard="false"
      placement="right"
      onClose={onClose}
      open={open}
      mask
      title={renderTitle}
      closable={false}
      footer={renderFooter}
    >
      <AvatarList />
    </Drawer>
  );
}

export default React.memo(EditAvatarDraw);

EditAvatarDraw.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenDraw: PropTypes.func.isRequired,
};
