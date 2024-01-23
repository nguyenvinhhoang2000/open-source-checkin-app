import React from "react";
import { Modal } from "antd";
import classnames from "classnames";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import { FORMAT_DATE } from "@/constants/format-date";
import onCheckIsEditAbsent from "@/utils/check-allowce-edit-absent";
import { emptyFn, emptyObj } from "@/utils/empty-types";

function AbsentModalView({
  isModalOpen,
  isLoadingButtonOk,
  onClose,
  currentData,
  onOpenEdit,
}) {
  const isEdit = onCheckIsEditAbsent(currentData.record?.fromAt);

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
        {currentData.columnData &&
          currentData.columnData.map((item) => (
            <div
              key={item.key}
              className="flex flex-row flex-wrap justify-between gap-2 font-roboto"
            >
              <span className="font-bold">{item.title}</span>
              <span>
                {item.key === "description"
                  ? currentData.record[item.key]?.toString()
                  : dayjs(new Date(currentData.record[item.key])).format(
                      FORMAT_DATE.FORMAT_DATE_FOR_DATE_AND_12_HOURS_AND_INTERVALS,
                    )}
              </span>
            </div>
          ))}
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
