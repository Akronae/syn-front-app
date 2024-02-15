export function isBlank(str: string): boolean {
  if (typeof str === `number`) str = (str as number).toString()
  if (typeof str !== `string`) return true
  return str.trim() === ``
}
