import validationMessages from "@/utils/validation-message";

export const INPUT_TYPES = {
  ENTER: "enter",
  SELECT: "select",
};

export const SCHEMAS = {
  REQUIRED_INPUT: (field) => {
    return {
      required: true,
      message: validationMessages(field, INPUT_TYPES.ENTER),
    };
  },

  REQUIRED_SELECT: (field) => {
    return {
      required: true,
      message: validationMessages(field, INPUT_TYPES.SELECT),
    };
  },
};
