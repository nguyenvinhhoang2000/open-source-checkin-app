export function formatPhoneUI(phone) {
  return phone?.replace(/^(\+84|0)/, 0);
}

export function formatPhoneApi(phone) {
  return phone?.replace(/^0/, "+84");
}
