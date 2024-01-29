import { VALIDATION_MESSAGE } from "@/utils/validation-message";

export const INPUT_TYPES = {
  INPUT: "enter",
  SELECT: "select",
};

export const SCHEMAS = {
  RULE_REQUIRED_INPUT: (field) => {
    return {
      required: true,
      message: VALIDATION_MESSAGE.REQUIRED_INPUT(INPUT_TYPES.INPUT, field),
    };
  },

  RULE_REQUIRED_SELECT: (field) => {
    return {
      required: true,
      message: VALIDATION_MESSAGE.REQUIRED_INPUT(INPUT_TYPES.SELECT, field),
    };
  },

  RULE_EMAIL: {
    type: "email",
    message: VALIDATION_MESSAGE.INVALID("Email"),
  },

  RULE_PHONE_NUMBER: {
    type: "string",
    pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
    message: VALIDATION_MESSAGE.INVALID("Phone Number"),
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
