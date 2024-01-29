import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useBoolean } from "usehooks-ts";

import useAuthStore from "@/store/use-auth-store";

import {
  errorLoginFailMessage,
  loadingLoginMessage,
  LOGIN_FORM,
  rulesEmail,
  rulesPassword,
} from "./config-form";

function LoginForm() {
  const onLogin = useAuthStore().onLogin;

  const [loginForm] = Form.useForm();

  const {
    value: isDisabledLoginForm,
    setTrue: onDisabledLoginForm,
    setFalse: onEnabledLoginForm,
  } = useBoolean(false);

  const onSubmitForm = async (record) => {
    const onCancelLoadingMessage = message.loading(loadingLoginMessage);

    onDisabledLoginForm();

    const { message: messResult, status, payload } = await onLogin(record);

    if (payload) {
      loginForm.setFields(errorLoginFailMessage);

      onEnabledLoginForm();

      onCancelLoadingMessage();

      return;
    }

    onCancelLoadingMessage();

    onEnabledLoginForm();

    message[status](messResult, 1);
  };
  return (
    <Form
      form={loginForm}
      disabled={isDisabledLoginForm}
      name="normal_login"
      className="flex max-w-[29rem] flex-col justify-center rounded-xl bg-secondary-1 p-[2rem] shadow-dropShadow"
      onFinish={onSubmitForm}
    >
      <div className="mb-[1.5rem]">
        <h2 className="mb-[0.25rem] px-[2.37rem] text-center font-roboto text-3xl font-medium leading-10 text-character-1">
          Welcome Back
        </h2>
        <p className="font-roboto text-sm font-normal leading-[1.375rem] text-character-2 sm:px-[2.37rem]">
          Enter the account provided to access the dashboard
        </p>
      </div>
      <Form.Item name={LOGIN_FORM.EMAIL.name} rules={rulesEmail}>
        <Input
          prefix={<MailOutlined className="my-[0.4375rem] text-primary-0" />}
          placeholder={LOGIN_FORM.EMAIL.placeholder}
        />
      </Form.Item>
      <Form.Item
        name={LOGIN_FORM.PASSWORD.name}
        rules={rulesPassword}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="my-[0.5rem] text-primary-0" />}
          placeholder={LOGIN_FORM.PASSWORD.placeholder}
        />
      </Form.Item>
      <Form.Item className="mb-0">
        <Button type="primary" htmlType="submit" className="h-[2.5rem] w-full">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
}

export default React.memo(LoginForm);
