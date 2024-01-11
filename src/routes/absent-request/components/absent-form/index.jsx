import React from "react";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import PropTypes from "prop-types";
import { useBoolean } from "usehooks-ts";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import { emptyFn, emptyObj } from "@/utils/empty-types";

function AbsentFormModal({
  cancelText,
  isModalOpen,
  onClose,
  currentData,
  formName,
}) {
  const {
    value: isLoadingButtonOk,
    setTrue: setLoadingButtonOk,
    setFalse: setUnLoadingButtonOk,
  } = useBoolean(false);

  const [absentForm] = Form.useForm();

  React.useEffect(() => {
    console.log(`🚀🚀🚀!..currentData:`, currentData);
    absentForm.setFieldsValue(currentData);
  }, [absentForm, currentData]);

  const onSubmit = React.useCallback(() => {
    setLoadingButtonOk();
    const record = absentForm.getFieldsValue();
    const handleRequest = new Promise((resolve) => {
      setTimeout(() => {
        setUnLoadingButtonOk();
        onClose();
        resolve(record);
      }, [2000]);
    });
    handleRequest
      .then((res) => {
        console.log(`🚀🚀🚀!..res:`, res);
      })
      .catch((err) => {
        console.log(`🚀🚀🚀!..err:`, err);
      });
  }, [absentForm, onClose, setLoadingButtonOk, setUnLoadingButtonOk]);

  return (
    <Modal
      forceRender
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
        name={formName}
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
  formName: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  currentData: PropTypes.instanceOf(Object),
};

AbsentFormModal.defaultProps = {
  isModalOpen: false,
  cancelText: "",
  onClose: emptyFn,
  currentData: emptyObj,
};
