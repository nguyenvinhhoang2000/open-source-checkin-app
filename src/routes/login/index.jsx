import React from "react";
import { useSearchParams } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useBoolean } from "usehooks-ts";

import { LOCATIONS } from "@/constants/routes";
import useAuthStore from "@/store/use-auth-store";

import { initialValues, rulesEmail, rulesPassword } from "./config-login";

function Login() {
  const { onLogin } = useAuthStore();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const {
    value: isLoadingLogin,
    setTrue: onLoadingLogin,
    setFalse: onUnLoadingLogin,
  } = useBoolean(false);

  const onFinish = async (record) => {
    const loadingMessage = message.loading("Login");
    onLoadingLogin();

    const result = await onLogin(record);
    loadingMessage();
    onUnLoadingLogin();
    message[result.status](result.message, 1);

    // eslint-disable-next-line no-unused-expressions
    result.ok &&
      window.location.replace(redirect || LOCATIONS.MEMBER_DASHBOARD);
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center bg-hero-pattern bg-center">
      <img
        src="/assets/icons/wiicamp-logo-vertical.svg"
        alt="logo"
        title="wiicamp-logo"
        className="mb-[2.75rem]"
      />
      <div>
        <Form
          disabled={isLoadingLogin}
          name="normal_login"
          className="flex max-w-[29rem] flex-col justify-center rounded-xl bg-secondary-1 p-[2rem] shadow-dropShadow"
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <div className="mb-[1.5rem]">
            <h2 className="mb-[0.25rem] px-[2.37rem] text-center font-roboto text-3xl font-medium leading-10 text-character-1">
              Welcome Back
            </h2>
            <p className="font-roboto text-sm font-normal leading-[1.375rem] text-character-2 sm:px-[2.37rem]">
              Enter the account provided to access the dashboard
            </p>
          </div>
          <Form.Item name="email" rules={rulesEmail}>
            <Input
              prefix={
                <MailOutlined className="my-[0.4375rem] text-primary-0" />
              }
              placeholder="Enter your Email"
            />
          </Form.Item>
          <Form.Item name="password" rules={rulesPassword} hasFeedback>
            <Input.Password
              prefix={<LockOutlined className="my-[0.5rem] text-primary-0" />}
              placeholder="Enter your Password"
            />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="h-[2.5rem] w-full"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default React.memo(Login);
