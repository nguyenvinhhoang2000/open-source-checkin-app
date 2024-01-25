import React from "react";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import customizeFormLabel from "@/components/form/customize-form-label";

import { ABSENT_MODAL_NAME } from "@/constants/absent-form-name";
import { ABSENT_REASONS } from "@/constants/absent-reason";
import { ABSENT_TYPES } from "@/constants/absent-types";
import { emptyObj } from "@/utils/empty-types";

import {
  ABSENT_FORM,
  absentTypes,
  description,
  fromAt,
  reasonType,
  toAt,
} from "./config-form";

function AbsentRequestForm({
  isModalOpen,
  currentData,
  formName,
  onSubmitForm,
  absentForm,
  isDisabledForm,
}) {
  React.useEffect(() => {
    if (isModalOpen && formName === ABSENT_MODAL_NAME.EDIT) {
      const currentOne = {
        ...currentData,
        toAt: dayjs(new Date(currentData.toAt)),
        fromAt: dayjs(new Date(currentData.fromAt)),
      };
      absentForm.setFieldsValue(currentOne);
    } else {
      absentForm.resetFields();
    }
  }, [isModalOpen, formName, currentData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form
      disabled={isDisabledForm}
      requiredMark={customizeFormLabel}
      className="border-b border-t border-b-black/5 border-t-black/5 px-6 pb-1 pt-4"
      form={absentForm}
      layout="vertical"
      name={formName}
      onFinish={onSubmitForm}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name={ABSENT_FORM.TYPE_ABSENT.name}
            label={ABSENT_FORM.TYPE_ABSENT.label}
            rules={absentTypes}
          >
            <Select placeholder="Select type" allowClear>
              {ABSENT_TYPES.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={ABSENT_FORM.REASON.name}
            label={ABSENT_FORM.REASON.label}
            required
            rules={reasonType}
          >
            <Select placeholder="Select reason" allowClear>
              {ABSENT_REASONS.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name={ABSENT_FORM.FORM_DATE.name}
            label={ABSENT_FORM.FORM_DATE.label}
            required
            rules={fromAt}
          >
            <DatePicker
              showTime
              popupClassName="max-h-[25rem] overflow-y-scroll ssm:h-fit ssm:overflow-y-hidden"
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
          <Form.Item
            name={ABSENT_FORM.TO_DATE.name}
            label={ABSENT_FORM.TO_DATE.label}
            required
            rules={toAt}
          >
            <DatePicker
              showTime
              popupClassName="max-h-[25rem] overflow-y-scroll ssm:h-fit ssm:overflow-y-hidden"
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
      <Form.Item
        name={ABSENT_FORM.DESCRIPTION.name}
        label={ABSENT_FORM.DESCRIPTION.label}
        required
        rules={description}
      >
        <Input.TextArea
          showCount
          maxLength={100}
          rows={4}
          placeholder="Enter your Description"
        />
      </Form.Item>
    </Form>
  );
}

export default React.memo(AbsentRequestForm);

AbsentRequestForm.propTypes = {
  isModalOpen: PropTypes.bool,
  formName: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  currentData: PropTypes.instanceOf(Object),
  absentForm: PropTypes.instanceOf(Object).isRequired,
  isDisabledForm: PropTypes.bool.isRequired,
};

AbsentRequestForm.defaultProps = {
  isModalOpen: false,
  currentData: emptyObj,
};
