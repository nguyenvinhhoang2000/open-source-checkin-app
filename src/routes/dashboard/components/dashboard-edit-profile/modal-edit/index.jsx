import React from "react";
import { Form, Input, Modal, Select } from "antd";
import PropTypes from "prop-types";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import { GENDER } from "@/constants/gender";
import { emptyFn, emptyObj } from "@/utils/empty-types";

import { rulesNote, rulesPhoneNumber } from "./config-edit-profile";

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

  const onSubmit = React.useCallback(async () => {
    const { errorFields } = await updateProfileForm.validateFields();

    if (!errorFields) {
      onHandleOk(updateProfileForm.getFieldsValue());
    }
  }, []);

  return (
    <Modal
      forceRender
      title={
        <AppTitlePopup
          titleText="Chỉnh sửa thông tin cá nhân"
          onClose={onClose}
          classNames="px-[1.25rem] mb-[1rem]"
        />
      }
      open={isModalOpen}
      closable={false}
      footer={
        <AppFooterPopup
          buttonOkType="Xác nhận"
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
        className="border-b border-t border-b-black/5 border-t-black/5 px-4 pb-3 pt-4"
        form={updateProfileForm}
        layout="vertical"
        name="edit-profile"
      >
        <Form.Item className="mb-2" name="name" label="Tên">
          <Input disabled />
        </Form.Item>
        <Form.Item className="mb-2" name="gender" label="Giới tính">
          <Select
            disabled
            placeholder="Select a option and change input text above"
          >
            {GENDER.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item className="mb-2" name="position" label="Vị trí">
          <Input disabled />
        </Form.Item>
        <Form.Item
          className="mb-2"
          name="phoneNumber"
          label="Số điện thoại"
          rules={rulesPhoneNumber}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
          className="mb-2"
          name="note"
          label="Ghi chú"
          rules={rulesNote}
        >
          <Input.TextArea
            showCount
            maxLength={100}
            rows={4}
            placeholder="Nhập ghi chú"
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
