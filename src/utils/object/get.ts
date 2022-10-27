export function get<T>(obj: Record<string, any>, ...pathes: string[]): T | null {
  const path = pathes.join(`.`)
  if (!obj) return null
  let i
  const pathSplit = path.split(`.`)
  for (i = 0; i < pathSplit.length - 1; i++) {
    obj[pathSplit[i]] = obj[pathSplit[i]] || {}
    obj = obj[pathSplit[i]]
  }

  return obj[pathSplit[i]]
}