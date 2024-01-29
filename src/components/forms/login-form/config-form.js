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

const PASSWORD_LENGTH = {
  MIN: 6,
  MAX: 12,
};

const loadingLoginMessage = "Login";

const errorCode = { UNAUTHORIZED: 40100 };

const rulesEmail = [
  SCHEMAS.RULE_REQUIRED_INPUT(LOGIN_FORM.EMAIL.label),
  SCHEMAS.RULE_EMAIL,
];

const rulesPassword = [
  SCHEMAS.RULE_REQUIRED_INPUT(LOGIN_FORM.PASSWORD.label),
  SCHEMAS.RULE_MIN(LOGIN_FORM.PASSWORD.label, PASSWORD_LENGTH.MIN),
  SCHEMAS.RULE_MAX(LOGIN_FORM.PASSWORD.label, PASSWORD_LENGTH.MAX),
];

const errorLoginFailMessage = [
  {
    name: "email",
    errors: ["Email is incorrect"],
  },
  {
    name: "password",
    errors: ["Password is incorrect"],
  },
];

const errorLoginNullMessage = [
  {
    name: "email",
    errors: [],
  },
  {
    name: "password",
    errors: [],
  },
];

export {
  LOGIN_FORM,
  rulesEmail,
  rulesPassword,
  errorLoginNullMessage,
  loadingLoginMessage,
  errorLoginFailMessage,
  errorCode,
};
