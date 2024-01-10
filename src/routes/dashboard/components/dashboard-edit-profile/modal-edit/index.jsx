import React from "react";
import { Form, Input, Modal, Select } from "antd";
import PropTypes from "prop-types";

import AppFooterDraw from "@/components/apps/app-footer-popup";
import AppTitleDraw from "@/components/apps/app-title-popup";

import { GENDER } from "@/constants/gender";
import { POSITION } from "@/constants/position";
import { emptyFn } from "@/utils/empty-types";

function ModalEditProfile({
  CancelText,
  okText,
  onHandleOk,
  onHandleCancel,
  isModalOpen,
  isLoadingButtonOk,
  onClose,
  currentData,
}) {
  const [updateProfileForm] = Form.useForm();

  React.useEffect(() => {
    updateProfileForm.setFieldsValue(currentData);
  }, [currentData, updateProfileForm]);

  const onSubmit = React.useCallback(() => {
    // HANDLE UPDATE DATA RIGHT HERE
    const record = updateProfileForm.getFieldsValue();
    console.log(`🚀🚀🚀!..record:`, record);
    // CLOSE AFTER UPDATE DATA
    onHandleOk();
  }, [onHandleOk, updateProfileForm]);

  return (
    <Modal
      title={
        <AppTitleDraw
          titleText="Edit Profile"
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
          cancelText={CancelText}
          onCancel={onHandleCancel}
          isLoadingButtonOk={isLoadingButtonOk}
          classNames="px-[1.25rem]"
        />
      }
    >
      <Form
        className="border-b border-t border-b-black/5 border-t-black/5 px-4 pb-1 pt-4"
        form={updateProfileForm}
        layout="vertical"
        name="edit-profile"
      >
        <Form.Item name="name" label="Name">
          <Input disabled />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Select
            disabled
            placeholder="Select a option and change input text above"
          >
            {GENDER.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="position" label="Position">
          <Input disabled />
        </Form.Item>
        <Form.Item name="branch" label="Branch">
          <Select
            disabled
            placeholder="Select a option and change input text above"
          >
            {POSITION.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
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

export default ModalEditProfile;

ModalEditProfile.propTypes = {
  isModalOpen: PropTypes.bool,
  CancelText: PropTypes.string,
  okText: PropTypes.string,
  onHandleOk: PropTypes.func,
  onHandleCancel: PropTypes.func,
  isLoadingButtonOk: PropTypes.bool,
  onClose: PropTypes.func,
  currentData: PropTypes.instanceOf(Object).isRequired,
};

ModalEditProfile.defaultProps = {
  isModalOpen: false,
  CancelText: "",
  okText: "",
  isLoadingButtonOk: false,
  onHandleOk: emptyFn,
  onHandleCancel: emptyFn,
  onClose: emptyFn,
};
