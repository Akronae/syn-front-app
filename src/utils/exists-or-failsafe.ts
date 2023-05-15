export function existsOrFailsafe<T>(
  data: T,
  fallback: NonNullable<T>,
  errorMsg?: string,
): NonNullable<T> {
  if (!data) {
    if (errorMsg) console.error(errorMsg, `\n`, `Falling back to:`, fallback)
    return fallback
  }

  return data
}
