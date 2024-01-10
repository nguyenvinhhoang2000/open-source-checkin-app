import React from "react";
import { Form, Input, Modal, Select } from "antd";
import PropTypes from "prop-types";

import AppFooterDraw from "@/components/apps/app-footer-draw";
import AppTitleDraw from "@/components/apps/app-title-draw";

import { emptyFn } from "@/utils/empty-types";

function ModalEditProfile({
  CancelText,
  okText,
  onHandleOk,
  onHandleCancel,
  isModalOpen,
  loadingButtonOk,
  onClose,
  currentData,
}) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(currentData);
  }, [currentData, form]);

  const onFinish = React.useCallback((record) => {
    console.log(`🚀🚀🚀!..record:`, record);
  }, []);
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
          okText={okText}
          onOk={onHandleOk}
          cancleText={CancelText}
          onCancel={onHandleCancel}
          loadingButtonOk={loadingButtonOk}
          classNames="px-[1.25rem]"
        />
      }
    >
      <Form
        className="border-t border-t-black/5 px-4 pt-4"
        form={form}
        layout="vertical"
        name="edit-profile"
        onFinish={onFinish}
      >
        <Form.Item name="name" label="Name">
          <Input disabled />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Select
            disabled
            placeholder="Select a option and change input text above"
          >
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
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
            <Select.Option value="male">Head office, Da Nang</Select.Option>
            <Select.Option value="female">Sub office, HCM</Select.Option>
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
  loadingButtonOk: PropTypes.bool,
  onClose: PropTypes.func,
  currentData: PropTypes.instanceOf(Object).isRequired,
};

ModalEditProfile.defaultProps = {
  isModalOpen: false,
  CancelText: "",
  okText: "",
  loadingButtonOk: false,
  onHandleOk: emptyFn,
  onHandleCancel: emptyFn,
  onClose: emptyFn,
};
