const initialValues = {
  remember: true,
};
const rulesEmail = [
  { required: true, message: "Please input your E-mail!" },
  { type: "email", message: "The input is not valid E-mail!" },
];
const rulesPassword = [
  {
    required: true,
    message: "Please input your Password!",
  },
  { min: 6, message: "Password must be at least 6 characters" },
  { max: 12, message: "Password cannot exceed more than 12 characters" },
];

export { initialValues, rulesEmail, rulesPassword };
