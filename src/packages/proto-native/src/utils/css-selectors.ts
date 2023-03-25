export type CSSSelectors = { firstChild: boolean; lastChild: boolean }

export function computeCSSSelectors<T>(
  node: T,
  index: number,
  arr: T[],
): CSSSelectors {
  return {
    firstChild: index === 0,
    lastChild: index === arr.length - 1,
  }
}
