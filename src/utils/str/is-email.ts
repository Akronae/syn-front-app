export function isEmail(str: string): boolean {
  if (str.trim() === ``) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
}
