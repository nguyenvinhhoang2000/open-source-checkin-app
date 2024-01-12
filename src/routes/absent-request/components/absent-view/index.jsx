import React from "react";
import { Modal } from "antd";
import classnames from "classnames";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import onCheckIsEditAbsent from "@/utils/check-allowce-edit-absent";
import { emptyFn, emptyObj } from "@/utils/empty-types";

function AbsentModalView({
  isModalOpen,
  isLoadingButtonOk,
  onClose,
  currentData,
  onOpenEdit,
}) {
  const isEdit = onCheckIsEditAbsent(currentData.record?.dateRequest);
  const onOkBtn = React.useCallback(() => {
    if (isEdit) {
      onClose();
      onOpenEdit();
    } else {
      onClose();
    }
  }, [isEdit, onClose, onOpenEdit]);

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
          onOk={onOkBtn}
          okText={isEdit ? "Edit" : "OK"}
          cancelText={isEdit ? "Cancel" : ""}
          onCancel={onClose}
          isLoadingButtonOk={isLoadingButtonOk}
          classNames="px-[1.25rem]"
          buttonOkClassNames={classnames(!isEdit && "min-w-[6.25rem]")}
        />
      }
    >
      <div className="flex flex-col gap-2 border-b border-t border-b-black/5 border-t-black/5 px-6 pb-1 pt-4">
        {currentData.record &&
          Object.keys(currentData.record).map((item) => {
            return (
              <div
                key={item}
                className="flex flex-row flex-wrap justify-between gap-2 font-roboto"
              >
                <span className="font-bold">
                  {
                    currentData.columnData.find((child) => child.key === item)
                      ?.title
                  }
                </span>
                <span>
                  {currentData.record[item] instanceof Date
                    ? dayjs(currentData.record[item]).format("D-M-YYYY h:m A")
                    : currentData.record[item].toString()}
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
  isLoadingButtonOk: PropTypes.bool,
  onClose: PropTypes.func,
  onOpenEdit: PropTypes.func,
  currentData: PropTypes.instanceOf(Object),
};

AbsentModalView.defaultProps = {
  isModalOpen: false,
  isLoadingButtonOk: false,
  onClose: emptyFn,
  onOpenEdit: emptyFn,
  currentData: emptyObj,
};
