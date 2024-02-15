export function capitalize(str: string | undefined | null) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
