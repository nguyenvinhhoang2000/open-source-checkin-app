import React from "react";
import { Form, Input, Modal, Select } from "antd";
import PropTypes from "prop-types";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import { emptyFn, emptyObj } from "@/utils/empty-types";

function AbsentFormModal({
  cancelText,
  okText,
  onHandleOk,
  onHandleCancel,
  isModalOpen,
  isLoadingButtonOk,
  onClose,
  currentData,
}) {
  const [absentForm] = Form.useForm();

  React.useEffect(() => {
    if (currentData?.description) {
      absentForm.setFieldsValue(currentData);
    }
  }, [absentForm, currentData, currentData?.description]);

  const onSubmit = React.useCallback(() => {
    onHandleOk();
  }, [onHandleOk]);

  return (
    <Modal
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
          onOk={onSubmit}
          cancelText={cancelText}
          onCancel={onHandleCancel}
          isLoadingButtonOk={isLoadingButtonOk}
          classNames="px-[1.25rem]"
        />
      }
    >
      <Form
        className="border-b border-t border-b-black/5 border-t-black/5 px-4 pb-1 pt-4"
        form={absentForm}
        layout="vertical"
        name="edit-profile"
      >
        <Form.Item name="name" label="Name">
          <Form.Item name="name" label="Name">
            <Select />
          </Form.Item>
          <Form.Item name="name" label="Name">
            <Select />
          </Form.Item>
        </Form.Item>
        <Form.Item name="position" label="Position">
          <Input disabled />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input placeholder="Enter your Phone" />
        </Form.Item>
        <Form.Item name="note" label="Note">
          <Input.TextArea
            showCount
            className="h-[6rem]"
            maxLength={100}
            placeholder="Enter your note"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AbsentFormModal;

AbsentFormModal.propTypes = {
  isModalOpen: PropTypes.bool,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  onHandleOk: PropTypes.func,
  onHandleCancel: PropTypes.func,
  isLoadingButtonOk: PropTypes.bool,
  onClose: PropTypes.func,
  currentData: PropTypes.instanceOf(Object),
};

AbsentFormModal.defaultProps = {
  isModalOpen: false,
  cancelText: "",
  okText: "",
  isLoadingButtonOk: false,
  onHandleOk: emptyFn,
  onHandleCancel: emptyFn,
  onClose: emptyFn,
  currentData: emptyObj,
};
