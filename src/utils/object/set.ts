export function set(obj: Record<string, any>, path: string, value: any) {
  let i: number
  const pathParts = path.split(`.`)
  for (i = 0; i < pathParts.length - 1; i++) {
    obj[pathParts[i]] = obj[pathParts[i]] || {}
    obj = obj[pathParts[i]]
  }

  obj[pathParts[i]] = value
}