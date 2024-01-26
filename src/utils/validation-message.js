export const VALIDATION_MESSAGE = {
  PLEASE_ENTER: (message, type) => {
    return `Please ${type} ${message}`;
  },

  INVALID: (field) => {
    return `The input is not valid ${field}!`;
  },

  MIN: (field, min) => {
    return `${field} must be at least ${min} characters`;
  },

  MAX: (field, max) => {
    return `${field} cannot exceed more than ${max} characters`;
  },
};
