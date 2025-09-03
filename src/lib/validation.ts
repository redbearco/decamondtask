
const phoneRegex = /^(?:\+98|0098|0)?9\d{9}$/

export function validatePhone(phone: string): boolean {
  return phoneRegex.test(phone)
}
