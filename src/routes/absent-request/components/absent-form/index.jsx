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

import { ABSENT_FORM_NAME } from "@/constants/absent-form-name";
import { ABSENT_REASONS } from "@/constants/absent-reason";
import { ABSENT_TYPES } from "@/constants/absent-types";
import useAuthStore from "@/store/use-auth-store";
import useLoadingStore from "@/store/use-loading-store";
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
  const onHideLoadingAbsentTable = useLoadingStore().onHideLoadingAbsentTable;
  const onShowLoadingAbsentTable = useLoadingStore().onShowLoadingAbsentTable;
  const onRefreshAbsentTable = useLoadingStore().onRefreshAbsentTable;

  const switchAction = React.useRef({
    [ABSENT_FORM_NAME.CREATE]: useAuthStore().onCreateAbsentRequest,
    [ABSENT_FORM_NAME.EDIT]: useAuthStore().onEditAbsentRequest,
  }).current;

  const {
    value: isLoadingButtonOk,
    setTrue: onShowLoadingButtonOk,
    setFalse: onHideLoadingButtonOk,
  } = useBoolean(false);

  const [absentForm] = Form.useForm();

  const onSubmit = React.useCallback(async () => {
    await absentForm.validateFields();

    onShowLoadingAbsentTable();
    onShowLoadingButtonOk();

    const {
      status,
      message: messageResult,
      messArr,
    } = await switchAction[formName](
      absentForm.getFieldsValue(),
      absentForm.getFieldValue("_id"),
    );

    if (messArr) {
      messArr.forEach((item) =>
        absentForm.setFields([
          {
            name: item.param,
            errors: [item.msg],
          },
        ]),
      );

      onHideLoadingButtonOk();
      onHideLoadingAbsentTable();

      return;
    }

    message[status](messageResult, 1);
    absentForm.resetFields();

    onRefreshAbsentTable();
    onHideLoadingButtonOk();
    onHideLoadingAbsentTable();
    onClose();
  }, [formName]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (
      formName === ABSENT_FORM_NAME.EDIT &&
      currentData &&
      currentData.record
    ) {
      const currentOne = {
        ...currentData.record,
        toAt: dayjs(new Date(currentData.record.toAt)),
        fromAt: dayjs(new Date(currentData.record.fromAt)),
      };

      absentForm.setFieldsValue(currentOne);
    }
  }, [absentForm, currentData, formName]);

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
