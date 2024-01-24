import React from "react";
import { Modal } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";
import AbsentRequestForm from "@/components/form/absent-request-form";

import { ABSENT_MODAL_NAME } from "@/constants/absent-form-name";
import onCheckIsEditAbsent from "@/utils/check-allowce-edit-absent";
import { emptyFn, emptyObj } from "@/utils/empty-types";

import AbsentView from "../absent-view";

function CommonModal({
  isModalOpen,
  isLoadingButtonOk,
  onClose,
  currentData,
  modalName,
  onOpenModal,
}) {
  const isEdit = onCheckIsEditAbsent(currentData.record?.fromAt);

  const onOkBtn = React.useCallback(() => {
    if (isEdit) {
      onClose();

      onOpenModal(ABSENT_MODAL_NAME.EDIT);
    } else {
      onClose();
    }
  }, [isEdit, onClose, onOpenModal]);

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
      onCancel={onClose}
    >
      {modalName === ABSENT_MODAL_NAME.VIEW && (
        <AbsentView currentData={currentData} isModalOpen={isModalOpen} />
      )}

      {modalName === ABSENT_MODAL_NAME.CREATE && (
        <AbsentRequestForm
          formName={ABSENT_MODAL_NAME.CREATE}
          isModalOpen={isModalOpen}
          onClose={onClose}
        />
      )}

      {modalName === ABSENT_MODAL_NAME.EDIT && (
        <AbsentRequestForm
          formName={ABSENT_MODAL_NAME.EDIT}
          currentData={currentData}
          isModalOpen={isModalOpen}
          onClose={onClose}
        />
      )}
    </Modal>
  );
}

export default React.memo(CommonModal);

CommonModal.propTypes = {
  isModalOpen: PropTypes.bool,
  isLoadingButtonOk: PropTypes.bool,
  onClose: PropTypes.func,
  onOpenModal: PropTypes.func,
  currentData: PropTypes.instanceOf(Object),
  modalName: PropTypes.string.isRequired,
};

CommonModal.defaultProps = {
  isModalOpen: false,
  isLoadingButtonOk: false,
  onClose: emptyFn,
  onOpenModal: emptyFn,
  currentData: emptyObj,
};
