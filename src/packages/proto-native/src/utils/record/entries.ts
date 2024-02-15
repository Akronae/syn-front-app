export function entries<T1 extends string | number | symbol, T2>(
  record: Record<T1, T2>,
): [T1, T2][] {
  return Object.entries(record) as [T1, T2][]
}
