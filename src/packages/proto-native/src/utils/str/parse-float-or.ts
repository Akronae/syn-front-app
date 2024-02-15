export function parseFloatOr<T>(
  value: string | number | undefined,
  fallback: T,
): number | T {
  if (!value) return fallback
  const parsed = parseFloat(value.toString())
  return isNaN(parsed) ? fallback : parsed
}
