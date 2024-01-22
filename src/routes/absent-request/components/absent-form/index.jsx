import React from "react";
import {
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useBoolean } from "usehooks-ts";

import AppFooterPopup from "@/components/apps/app-footer-popup";
import AppTitlePopup from "@/components/apps/app-title-popup";

import { ABSENT_REASONS } from "@/constants/absent-reason";
import { ABSENT_TYPES } from "@/constants/absent-types";
import useAuthStore from "@/store/use-auth-store";
import { emptyFn, emptyObj } from "@/utils/empty-types";

import {
  absentTypes,
  description,
  fromAt,
  reasonType,
  toAt,
} from "./config-form";
import CustomizeFormLabel from "./CustomizeFormLabel";

function AbsentFormModal({
  cancelText,
  isModalOpen,
  onClose,
  currentData,
  formName,
}) {
  const onCreateAbsentRequest = useAuthStore().onCreateAbsentRequest;

  const {
    value: isLoadingButtonOk,
    setTrue: onShowLoadingButtonOk,
    setFalse: onHideLoadingButtonOk,
  } = useBoolean(false);

  const [absentForm] = Form.useForm();

  React.useEffect(() => {
    if (currentData && currentData?.record) {
      const currentOne = {
        ...currentData.record,
        to: dayjs(new Date(currentData.record.to)),
        from: dayjs(new Date(currentData.record.from)),
      };
      absentForm.setFieldsValue(currentOne);
    }
  }, [absentForm, currentData]);

  const onSubmit = React.useCallback(async () => {
    await absentForm.validateFields();

    onShowLoadingButtonOk();

    const { status, message: messageResult } = await onCreateAbsentRequest(
      absentForm.getFieldsValue(),
    );

    message[status](messageResult, 1);

    onHideLoadingButtonOk();

    onClose();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onDisabledFromAt = React.useCallback(
    (current) => {
      return (
        current.isBefore(dayjs().subtract(1, "day")) ||
        (dayjs(absentForm.getFieldValue("toAt")).diff(
          dayjs(Date.now()),
          "day",
        ) &&
          dayjs(current).isAfter(dayjs(absentForm.getFieldValue("toAt"))))
      );
    },
    [absentForm],
  );

  const onDisabledToAt = React.useCallback(
    (current) => {
      return (
        (dayjs(absentForm.getFieldValue("fromAt")).diff(
          dayjs(Date.now()),
          "day",
        ) &&
          current.isBefore(dayjs(absentForm.getFieldValue("fromAt")))) ||
        current.isBefore(dayjs().subtract(1, "day"))
      );
    },
    [absentForm],
  );

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
        requiredMark={CustomizeFormLabel}
        className="border-b border-t border-b-black/5 border-t-black/5 px-6 pb-1 pt-4"
        form={absentForm}
        layout="vertical"
        name={formName}
        onFinish={onSubmit}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="absentType"
              label="Type Absent"
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
              hasFeedback
              labelAlign="right"
              name="reasonType"
              label="Reason"
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
            <Form.Item name="fromAt" label="From" required rules={fromAt}>
              <DatePicker
                disabledDate={onDisabledFromAt}
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
            <Form.Item name="toAt" label="To" required rules={toAt}>
              <DatePicker
                disabledDate={onDisabledToAt}
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
          name="description"
          label="Description"
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
