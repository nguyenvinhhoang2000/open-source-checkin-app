import React from "react";
import { Form, message, Modal } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useBoolean } from "usehooks-ts";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";
import AbsentRequestForm from "@/components/form/absent-request-form";

import { ABSENT_MODAL_NAME } from "@/constants/absent-form-name";
import useAbsentStore from "@/store/use-absent-store";
import onCheckIsEditAbsent from "@/utils/check-allowce-edit-absent";
import { emptyFn, emptyObj } from "@/utils/empty-types";
import seletecButtonPopupName from "@/utils/select-footer-button-popup-name";

import AbsentView from "../absent-view";

function CommonModal({
  isModalOpen,
  isLoadingButtonOk,
  onClose,
  currentData,
  modalName,
  onOpenModal,
}) {
  const switchActions = React.useRef({
    [ABSENT_MODAL_NAME.CREATE]: useAbsentStore().onCreateAbsentRequest,
    [ABSENT_MODAL_NAME.EDIT]: useAbsentStore().onEditAbsentRequest,
  }).current;

  const {
    value: isDisabledForm,
    setTrue: setDisabledForm,
    setFalse: setEnabledForm,
  } = useBoolean(false);

  const [absentForm] = Form.useForm();

  const isEdit = onCheckIsEditAbsent(currentData.fromAt);

  const onSubmitForm = React.useCallback(async () => {
    await absentForm.validateFields();
    setDisabledForm();

    const {
      status,
      message: { message: messageResult, errors: arrErrors },
    } = await switchActions[modalName](
      absentForm.getFieldsValue(),
      absentForm.getFieldValue("_id"),
    );

    const keepChecking =
      arrErrors &&
      arrErrors.every(
        (item) =>
          item &&
          (absentForm.setFields([{ name: item.param, errors: [item.msg] }]),
          true),
      );
    setEnabledForm();
    message[status](messageResult, 1.5);

    if (!keepChecking) {
      absentForm.resetFields();
      onClose();
    }
  }, [modalName]); // eslint-disable-line react-hooks/exhaustive-deps

  const onOk = React.useCallback(() => {
    switch (modalName) {
      case ABSENT_MODAL_NAME.VIEW:
        return isEdit ? onOpenModal(ABSENT_MODAL_NAME.EDIT) : onClose();
      case ABSENT_MODAL_NAME.CREATE:
      case ABSENT_MODAL_NAME.EDIT:
        return isEdit && onSubmitForm();
      default:
        return onClose();
    }
  }, [isEdit, modalName]); // eslint-disable-line react-hooks/exhaustive-deps

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
          onOk={onOk}
          okText={seletecButtonPopupName(modalName, isEdit)}
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

      {Object.keys(switchActions).includes(modalName) && (
        <AbsentRequestForm
          formName={modalName}
          onClose={onClose}
          currentData={currentData}
          onSubmitForm={onSubmitForm}
          absentForm={absentForm}
          isDisabledForm={isDisabledForm}
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
