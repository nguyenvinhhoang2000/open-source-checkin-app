const rulesPhoneNumber = [
  {
    type: "string",
    pattern: /^\+84[1-9][0-9]{8}\b/,
    message: "Please enter a valid phone number(+84999999999)",
  },
];
const rulesNote = [
  {
    type: "string",
    max: 100,
    message: "Note cannot exceed more than 100 characters",
  },
];

export { rulesPhoneNumber, rulesNote };
