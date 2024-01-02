import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import { initialValues, rulesEmail, rulesPassword } from "./config-login";

function Login() {
  const onFinish = async (e) => {
    e.preventDefault();
  };
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-hero-pattern">
      <img
        src="/src/assets/icons/wiicamp-logo.svg"
        alt="logo"
        title="wiicamp-logo"
        className="mb-[2.75rem]"
      />
      <div>
        <Form
          name="normal_login"
          className="shadow-dropShadow flex max-w-[29rem] flex-col justify-center rounded-xl bg-secondary-1 p-[2rem]"
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <div className="mb-[1.5rem] px-[2.37rem]">
            <h2 className="mb-[0.25rem] text-center font-roboto text-3xl font-medium leading-10 text-character-1">
              Welcome Back
            </h2>
            <p className="font-roboto text-sm font-normal leading-[1.375rem] text-character-2">
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

export default Login;
