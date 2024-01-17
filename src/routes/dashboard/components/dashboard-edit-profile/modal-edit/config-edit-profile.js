const rulesPhoneNumber = [
  {
    type: "string",
    pattern: /^(\+?84|0)([3|5|7|8|9])+([0-9]{8})\b/,
    message: "Please enter a valid phone number",
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
