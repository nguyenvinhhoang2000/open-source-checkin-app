import React from "react";

import LoginForm from "@/components/forms/login-form";

function Login() {
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-hero-pattern bg-cover bg-center bg-no-repeat">
      <img
        src="/assets/icons/wiicamp-logo-vertical.svg"
        alt="logo"
        title="wiicamp-logo"
        className="mb-[2.75rem]"
      />
      <LoginForm />
    </section>
  );
}

export default React.memo(Login);
