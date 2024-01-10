import React from "react";
import { Form, Input, Modal, Select } from "antd";
import PropTypes from "prop-types";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import { POSITION } from "@/constants/company-location";
import { GENDER } from "@/constants/gender";
import { emptyFn, emptyObj } from "@/utils/empty-types";

function ModalEditProfile({
  cancelText,
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
      forceRender
      title={
        <AppTitlePopup
          titleText="Edit Profile"
          onClose={onClose}
          classNames="px-[1.25rem] mb-[1rem]"
        />
      }
      open={isModalOpen}
      closable={false}
      footer={
        <AppFooterPopup
          buttonOkType="submit"
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
        form={updateProfileForm}
        layout="vertical"
        name="edit-profile"
      >
        <Form.Item className="mb-2" name="name" label="Name">
          <Input disabled />
        </Form.Item>
        <Form.Item className="mb-2" name="gender" label="Gender">
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
        <Form.Item className="mb-2" name="position" label="Position">
          <Input disabled />
        </Form.Item>
        <Form.Item className="mb-2" name="branch" label="Branch">
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
        <Form.Item className="mb-2" name="phone" label="Phone">
          <Input placeholder="Enter your Phone" />
        </Form.Item>
        <Form.Item className="mb-2" name="note" label="Note">
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

export default React.memo(ModalEditProfile);

ModalEditProfile.propTypes = {
  isModalOpen: PropTypes.bool,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  onHandleOk: PropTypes.func,
  onHandleCancel: PropTypes.func,
  isLoadingButtonOk: PropTypes.bool,
  onClose: PropTypes.func,
  currentData: PropTypes.instanceOf(Object),
};

ModalEditProfile.defaultProps = {
  isModalOpen: false,
  cancelText: "",
  okText: "",
  isLoadingButtonOk: false,
  onHandleOk: emptyFn,
  onHandleCancel: emptyFn,
  onClose: emptyFn,
  currentData: emptyObj,
};
