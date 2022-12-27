import { RgbaColor } from './rgba-color'

export function rgbaToHex(rgba: RgbaColor): string {
  const { r, g, b, a } = rgba
  const hex = `#${Math.round(r).toString(16)}${Math.round(g).toString(
    16,
  )}${Math.round(b).toString(16)}${Math.round(a * 255).toString(16)}`
  return hex
}
