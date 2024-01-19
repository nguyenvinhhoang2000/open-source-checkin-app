export function onFormatVietnamesePhone(phone, { space }) {
  const cleanedPhone = phone.replace(/^(\+84|0)/, 0);
  return space
    ? cleanedPhone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")
    : cleanedPhone;
}

export function onFormatGlobalPhone(phone) {
  return phone.replace(/^0/, "+84");
}
