import { luminance } from './luminance'

export function contrast(c1: string, c2: string): number {
  const l1 = luminance(c1)
  const l2 = luminance(c2)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}
