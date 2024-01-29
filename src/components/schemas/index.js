export const INPUT_TYPES = {
  INPUT: "enter",
  SELECT: "select",
};

export const SCHEMAS = {
  RULE_REQUIRED_INPUT: (field) => {
    return {
      required: true,
      message: `Please ${INPUT_TYPES.INPUT} ${field}`,
    };
  },

  RULE_REQUIRED_SELECT: (field) => {
    return {
      required: true,
      message: `Please ${INPUT_TYPES.SELECT} ${field}`,
    };
  },

  RULE_EMAIL: {
    type: "email",
    message: `The input is not valid Email!`,
  },

  RULE_PHONENUMBER: {
    type: "string",
    pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
    message: `The input is not valid Phone Number!`,
  },

  RULE_MIN: (field, min) => {
    return {
      min,
      message: `${field} must be at least ${min} characters`,
    };
  },

  RULE_MAX: (field, max) => {
    return {
      max,
      message: `${field} cannot exceed more than ${max} characters`,
    };
  },
};
