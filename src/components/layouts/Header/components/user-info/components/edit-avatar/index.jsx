import React from "react";
import { Drawer } from "antd";
import PropTypes from "prop-types";

import AppFooterDraw from "@/components/apps/app-footer-popup";
import AppTitleDraw from "@/components/apps/app-title-popup";

import { fullConfig } from "@/theme";

import AvatarList from "./components/avatar-list";

function EditAvatarDraw({ open, onOpenDraw }) {
  const [loadingOk, setLoadingOk] = React.useState(false);

  const onClose = React.useCallback(() => {
    onOpenDraw(false);
  }, [onOpenDraw]);

  const onSumbit = React.useCallback(() => {
    setLoadingOk(true);
    // HANDLE SUBMIT
    const handleEditData = new Promise((resolve) => {
      setTimeout(() => {
        setLoadingOk(false);
        onOpenDraw(false);
        resolve("Change avatar okay");
      }, 2000);
    });

    handleEditData
      .then((data) => {
        console.log(`🚀🚀🚀!..data:`, data);
      })
      .catch((error) => {
        console.log(`🚀🚀🚀!..change error`, error);
      });
  }, [onOpenDraw]);

  return (
    <Drawer
      width={fullConfig.theme.width.drawWidth}
      keyboard="false"
      placement="right"
      onClose={onClose}
      open={open}
      mask
      title={<AppTitleDraw titleText="Change Avatar" onClose={onClose} />}
      closable={false}
      footer={
        <AppFooterDraw
          htmlType="button"
          cancelText="Cancel"
          okText="Save"
          onOk={onSumbit}
          onCancel={onClose}
          loadingButtonOk={loadingOk}
        />
      }
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
