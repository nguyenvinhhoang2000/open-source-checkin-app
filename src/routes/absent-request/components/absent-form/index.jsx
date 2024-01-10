import React from "react";
import { DatePicker, Form, Input, Modal } from "antd";
import PropTypes from "prop-types";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import { emptyFn, emptyObj } from "@/utils/empty-types";

function AbsentFormModal({
  cancelText,
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
          onOk={onSubmit}
          cancelText={cancelText}
          onCancel={onHandleCancel}
          isLoadingButtonOk={isLoadingButtonOk}
          classNames="px-[1.25rem]"
        />
      }
    >
      <Form
        className="border-b border-t border-b-black/5 border-t-black/5 px-6 pb-1 pt-4"
        form={absentForm}
        layout="vertical"
        name="edit-profile"
      >
        <div className="flex flex-col sm:flex sm:flex-row sm:justify-start sm:gap-8 xl:flex xl:flex-row xl:justify-between">
          <Form.Item name="typeAbsent" label="Type Absent" required>
            <Input className="w-full" />
          </Form.Item>
          <Form.Item name="typeAbsent" label="Type Absent" required>
            <Input className="w-full" />
          </Form.Item>
        </div>
        <div className="flex flex-col sm:flex sm:flex-row sm:justify-start sm:gap-8 xl:flex xl:flex-row xl:justify-between">
          <Form.Item name="typeAbsent" label="Type Absent" required>
            <DatePicker className="sm:w-[16rem]" />
          </Form.Item>
          <Form.Item name="typeAbsent" label="Type Absent" required>
            <DatePicker className="sm:w-[16rem]" />
          </Form.Item>
        </div>
        <Form.Item name="note" label="Note">
          <Input.TextArea
            showCount
            className="flex h-[6rem] w-[32.5rem]"
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
  onHandleOk: PropTypes.func,
  onHandleCancel: PropTypes.func,
  isLoadingButtonOk: PropTypes.bool,
  onClose: PropTypes.func,
  currentData: PropTypes.instanceOf(Object),
};

AbsentFormModal.defaultProps = {
  isModalOpen: false,
  cancelText: "",
  isLoadingButtonOk: false,
  onHandleOk: emptyFn,
  onHandleCancel: emptyFn,
  onClose: emptyFn,
  currentData: emptyObj,
};
