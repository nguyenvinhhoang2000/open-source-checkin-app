import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

function Login() {
  const onFinish = async (e) => {
    e.preventDefault();
  };
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-hero-pattern">
      <img
        src="/src/assets/icons/wiicampLogo.svg"
        alt="logo"
        title="wiicamp-logo"
        className="mb-[2.75rem]"
      />
      <div>
        <Form
          name="normal_login"
          className="flex max-w-[29rem] flex-col justify-center rounded-xl bg-secondary-1 p-[2rem] shadow-formShadow"
          initialValues={{ remember: true }}
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
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={
                <MailOutlined className="my-[0.4375rem] text-primary-0" />
              }
              placeholder="Enter your Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
            hasFeedback
          >
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
