import React from "react";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useBoolean } from "usehooks-ts";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import { ABSENT_REASONS } from "@/constants/absent-reason";
import { ABSENT_TYPES } from "@/constants/absent-types";
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
    if (currentData && currentData?.description) {
      const currentOne = {
        ...currentData,
        to: dayjs(new Date(currentData.to)),
        from: dayjs(new Date(currentData.from)),
      };
      absentForm.setFieldsValue(currentOne);
    }
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
              <Select placeholder="Select type" allowClear>
                {ABSENT_TYPES.map((item) => (
                  <Select.Option value={item.key} key={item.key}>
                    {item.label}
                  </Select.Option>
                ))}
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
              <Select placeholder="Select reason" allowClear>
                {ABSENT_REASONS.map((item) => (
                  <Select.Option value={item.key} key={item.key}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="from" label="From" required>
              <DatePicker
                showTime
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
            <Form.Item name="to" label="To" required>
              <DatePicker
                showTime
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
