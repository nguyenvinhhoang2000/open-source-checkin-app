import { VALIDATION_MESSAGE } from "@/utils/validation-message";

export const INPUT_TYPES = {
  ENTER: "enter",
  SELECT: "select",
};
const RULE_MESSAGE = {
  EMAIL: "Email",
  PHONE_NUMBER: "Phone Number",
};

export const SCHEMAS = {
  RULE_REQUIRED_INPUT: (field) => {
    return {
      required: true,
      message: VALIDATION_MESSAGE.PLEASE_ENTER(field, INPUT_TYPES.ENTER),
    };
  },

  RULE_REQUIRED_SELECT: (field) => {
    return {
      required: true,
      message: VALIDATION_MESSAGE.PLEASE_ENTER(field, INPUT_TYPES.SELECT),
    };
  },

  RULE_EMAIL: {
    type: "email",
    message: VALIDATION_MESSAGE.INVALID(RULE_MESSAGE.EMAIL),
  },

  RULE_PHONENUMBER: {
    type: "string",
    pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
    message: VALIDATION_MESSAGE.INVALID(RULE_MESSAGE.PHONE_NUMBER),
  },

  RULE_MIN: (field, min) => {
    return {
      min,
      message: VALIDATION_MESSAGE.MIN(field, min),
    };
  },

  RULE_MAX: (field, max) => {
    return {
      max,
      message: VALIDATION_MESSAGE.MAX(field, max),
    };
  },
};
