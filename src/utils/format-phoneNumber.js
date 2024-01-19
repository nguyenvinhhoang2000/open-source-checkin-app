const prefixTypes = {
  "+84": "+84",
  "0x": "0x",
};

export default function replacePrefixPhoneNumber(phone, { space, type }) {
  let formatPhone;
  if (type === prefixTypes["+84"]) {
    formatPhone = phone.replace(/^0/, "+84");
  } else if (type === prefixTypes["0x"]) {
    formatPhone = phone.replace(/^(\+84|0)/, 0);
  }

  return space
    ? formatPhone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")
    : formatPhone;
}
