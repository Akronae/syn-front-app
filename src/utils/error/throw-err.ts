export function throwErr<T>(msg: string): NonNullable<T> {
  throw new Error(msg)
}
