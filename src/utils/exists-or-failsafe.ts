export function existsOrFailsafe<T>(
  data: T,
  fallback: NonNullable<T>,
  errorMsg?: string,
): NonNullable<T> {
  if (!data) {
    if (errorMsg) console.error(errorMsg)
    return fallback
  }

  return data
}
