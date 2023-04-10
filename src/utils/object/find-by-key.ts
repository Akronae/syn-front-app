export function findByKey<T = any>(
  obj: Record<string, any> | undefined,
  key: string,
): T | undefined {
  if (!obj) return undefined
  const foundKey = Object.keys(obj).find(
    (k) => k?.toLowerCase() === key?.toLowerCase(),
  )
  if (!foundKey) return undefined
  return obj[foundKey] as T
}
