const rulesPhoneNumber = [
  {
    type: "string",
    pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
    message: "Please enter a valid phone number (0944555666)",
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
