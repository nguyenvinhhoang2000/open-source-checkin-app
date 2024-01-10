import React from "react";
import { Form, Input, Modal } from "antd";
import PropTypes from "prop-types";

import AppFooterDraw from "@/components/apps/app-footer-draw";
import AppTitleDraw from "@/components/apps/app-title-draw";

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
  headerTitle,
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
        <AppTitleDraw
          titleText="Absent Request"
          onClose={onClose}
          classNames="px-[1.25rem] mb-[1rem]"
        />
      }
      open={isModalOpen}
      closable={false}
      footer={
        <AppFooterDraw
          htmlType="submit"
          okText={okText}
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
          <Input disabled />
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
  headerTitle: PropTypes.string.isRequired,
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
