import React from "react";
import { Drawer } from "antd";
import PropTypes from "prop-types";
import { useBoolean } from "usehooks-ts";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import { fullConfig } from "@/theme";

import AvatarList from "./avatar-list";

function EditAvatarDraw({ openDraw, onCloseDraw }) {
  const {
    value: isLoadingOk,
    setTrue: setLoadingOk,
    setFalse: setUnLoadingOk,
  } = useBoolean(false);

  const onSumbit = React.useCallback(() => {
    setLoadingOk();
    // HANDLE SUBMIT
    const handleEditData = new Promise((resolve) => {
      setTimeout(() => {
        setUnLoadingOk();
        onCloseDraw();
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
  }, [onCloseDraw, setLoadingOk, setUnLoadingOk]);

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
      <AvatarList />
    </Drawer>
  );
}

export default React.memo(EditAvatarDraw);

EditAvatarDraw.propTypes = {
  openDraw: PropTypes.bool.isRequired,
  onCloseDraw: PropTypes.func.isRequired,
};
