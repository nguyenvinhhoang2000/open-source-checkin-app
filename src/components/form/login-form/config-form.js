import { SCHEMAS } from "@/components/schemas";

const LOGIN_FORM = {
  EMAIL: {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
  },

  PASSWORD: {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
};

const rulesEmail = [SCHEMAS.REQUIRED_SELECT(LOGIN_FORM.EMAIL.label)];

const rulesPassword = [SCHEMAS.REQUIRED_SELECT(LOGIN_FORM.PASSWORD.label)];

export { LOGIN_FORM, rulesEmail, rulesPassword };
