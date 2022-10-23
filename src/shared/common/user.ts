export function clearPhone(phone: string) {
  if (phone[0] === '+') {
    phone = phone.slice(1)
  }

  return phone
}
