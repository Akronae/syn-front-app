export function parseIntOr<T>(
  value: string | number | undefined,
  fallback: T,
): number | T {
  if (!value) return fallback
  const parsed = parseInt(value.toString())
  return isNaN(parsed) ? fallback : parsed
}
