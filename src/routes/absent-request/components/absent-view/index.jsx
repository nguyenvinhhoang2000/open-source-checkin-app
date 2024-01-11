import React from "react";
import { Modal } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import { emptyFn, emptyObj } from "@/utils/empty-types";

function AbsentModalView({
  cancelText,
  isModalOpen,
  isLoadingButtonOk,
  onClose,
  currentData,
}) {
  return (
    <Modal
      width={572}
      title={
        <AppTitlePopup
          titleText="Absent Request"
          onClose={onClose}
          classNames="px-[1.25rem] mb-[1rem]"
        />
      }
      open={isModalOpen}
      closable={false}
      footer={
        <AppFooterPopup
          buttonOkType="submit"
          okText="Save"
          onOk={onClose}
          cancelText={cancelText}
          onCancel={onClose}
          isLoadingButtonOk={isLoadingButtonOk}
          classNames="px-[1.25rem]"
        />
      }
    >
      <div className="flex flex-col gap-2 border-b border-t border-b-black/5 border-t-black/5 px-6 pb-1 pt-4">
        {Object.keys(currentData).map((item) => {
          return (
            <div
              key={item}
              className="flex flex-row flex-wrap justify-between gap-2 font-roboto"
            >
              <span className="font-bold">
                {item
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
              <span>
                {currentData[item] instanceof Date
                  ? dayjs(currentData[item]).format("DD--MM-YYYY HH:mm:ss")
                  : currentData[item].toString()}
              </span>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default AbsentModalView;

AbsentModalView.propTypes = {
  isModalOpen: PropTypes.bool,
  cancelText: PropTypes.string,
  isLoadingButtonOk: PropTypes.bool,
  onClose: PropTypes.func,
  currentData: PropTypes.instanceOf(Object),
};

AbsentModalView.defaultProps = {
  isModalOpen: false,
  cancelText: "",
  isLoadingButtonOk: false,
  onClose: emptyFn,
  currentData: emptyObj,
};
