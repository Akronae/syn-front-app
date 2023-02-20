import { RgbaColor } from './rgba-color'
import { lerp } from '@proto-native/utils/math'

export function rgbaLerp(a: RgbaColor, b: RgbaColor, t: number): RgbaColor {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
    a: lerp(a.a, b.a, t),
  }
}
