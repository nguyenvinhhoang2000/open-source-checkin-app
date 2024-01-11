import React from "react";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import PropTypes from "prop-types";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import { emptyFn, emptyObj } from "@/utils/empty-types";

function AbsentFormModal({
  cancelText,
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
    const record = absentForm.getFieldsValue();
    console.log(`🚀🚀🚀!..record:`, record);
  }, [absentForm]);

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
          onCancel={onClose}
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
        onFinish={onSubmit}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              labelAlign="left"
              name="absentType"
              label="Type Absent"
              required
            >
              <Select placeholder="Select type">
                <Select.Option value="Zhejiang">Remove</Select.Option>
                <Select.Option value="Jiangsu">Absent</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              hasFeedback
              labelAlign="right"
              name="reason"
              label="Reason"
              required
            >
              <Select placeholder="Select reason">
                <Select.Option value="Zhejiang">I’m got sick</Select.Option>
                <Select.Option value="Jiangsu">
                  Equipment is damaged/forgotten
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="fromDate" label="From" required>
              <DatePicker
                placeholder="Pick time"
                className="w-full"
                suffixIcon={
                  <img
                    src="/assets/icons/union-date-picker.svg"
                    alt="union-date-picker"
                  />
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="toDate" label="To" required>
              <DatePicker
                placeholder="Pick time"
                className="w-full"
                suffixIcon={
                  <img
                    src="/assets/icons/union-date-picker.svg"
                    alt="union-date-picker"
                  />
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="description" label="Description" required>
          <Input.TextArea
            showCount
            className="flex h-[6rem]"
            maxLength={100}
            placeholder="Enter your Description"
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
  isLoadingButtonOk: PropTypes.bool,
  onClose: PropTypes.func,
  currentData: PropTypes.instanceOf(Object),
};

AbsentFormModal.defaultProps = {
  isModalOpen: false,
  cancelText: "",
  isLoadingButtonOk: false,
  onClose: emptyFn,
  currentData: emptyObj,
};
