import { RgbaColor } from './rgba-color'

export function rgbaToHex(rgba: RgbaColor): string {
  const { r, g, b, a } = rgba

  const toHex = (value: number) =>
    Math.round(value).toString(16).padStart(2, `0`)
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}${Math.round(a * 255)
    .toString(16)
    .padStart(2, `0`)}`
  return hex
}
