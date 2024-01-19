const rulesPhoneNumber = [
  {
    type: "string",
    pattern: /^\+849[0-9]{8}\b/,
    message: "Please enter a valid phone number(+8499999990)",
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
