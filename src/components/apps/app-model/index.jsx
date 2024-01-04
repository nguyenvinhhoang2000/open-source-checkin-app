import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

import { emptyFn } from "@/utils/empty-types";

import AppFooterDraw from "../app-footer-draw";

function AppModel({
  title,
  description,
  src,
  CancelText,
  okText,
  onHandleOk,
  onHandleCanlce,
  isModalOpen,
  loadingButtonOk,
}) {
  return (
    <Modal
      className="flex"
      title={
        <div className="mb-[1.5rem] mt-[0.75rem] flex gap-[1rem]">
          <div>
            <img src={src} alt="icon" title="check-in-icon" />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <p className="font-roboto text-base font-medium text-character-1">
              {title}
            </p>
            <p className="font-roboto text-sm	font-normal leading-[1.375rem] text-character-2">
              {description}
            </p>
          </div>
        </div>
      }
      open={isModalOpen}
      closable={false}
      footer={
        <AppFooterDraw
          okText={okText}
          onOk={onHandleOk}
          cancleText={CancelText}
          onCancle={onHandleCanlce}
          loadingButtonOk={loadingButtonOk}
        />
      }
    />
  );
}

export default React.memo(AppModel);

AppModel.propTypes = {
  title: PropTypes.string,
  CancelText: PropTypes.string,
  description: PropTypes.string,
  okText: PropTypes.string,
  src: PropTypes.node,
  onHandleOk: PropTypes.func,
  onHandleCanlce: PropTypes.func,
  isModalOpen: PropTypes.bool,
  loadingButtonOk: PropTypes.bool,
};

AppModel.defaultProps = {
  title: "",
  CancelText: "",
  description: "",
  okText: "",
  src: "",
  isModalOpen: false,
  loadingButtonOk: false,
  onHandleOk: emptyFn,
  onHandleCanlce: emptyFn,
};
