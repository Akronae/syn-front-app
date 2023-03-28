export function isIterable(obj: any): obj is Iterable<any> {
  return obj != null && typeof obj[Symbol.iterator] === `function`
}
