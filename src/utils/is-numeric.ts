export function isNumeric(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value)
}
