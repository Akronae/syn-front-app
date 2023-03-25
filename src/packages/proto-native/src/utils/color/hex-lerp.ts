import { hexToRgba } from './hex-to-rgba'
import { rgbaLerp } from './rgba-lerp'
import { rgbaToHex } from './rgba-to-hex'

export function hexLerp(a: string, b: string, t: number): string {
  const aRgba = hexToRgba(a)
  const bRgba = hexToRgba(b)
  const r = rgbaLerp(aRgba, bRgba, t)

  return rgbaToHex(r)
}
