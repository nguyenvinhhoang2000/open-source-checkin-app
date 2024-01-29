import React from "react";
import { Form, message } from "antd";
import { useBoolean } from "usehooks-ts";

import LoginForm from "@/components/form/login-form";
import {
  errorCode,
  errorLoginFailMessage,
  loadingLoginMessage,
} from "@/components/form/login-form/config";

import useAuthStore from "@/store/use-auth-store";

function Login() {
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

    const { message: messResult, status, messArr } = await onLogin(record);

    if (messArr && messArr.code === errorCode.UNAUTHORIZED) {
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
    <section className="flex h-screen flex-col items-center justify-center bg-hero-pattern bg-cover bg-center bg-no-repeat">
      <img
        src="/assets/icons/wiicamp-logo-vertical.svg"
        alt="logo"
        title="wiicamp-logo"
        className="mb-[2.75rem]"
      />
      <LoginForm
        isDisabledLoginForm={isDisabledLoginForm}
        onSubmitForm={onSubmitForm}
        form={loginForm}
      />
    </section>
  );
}

export default React.memo(Login);
