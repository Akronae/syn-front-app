import { RgbaColor } from './rgba-color'

export function hexToRgba(hex: string): RgbaColor {
  hex = hex.replace(`#`, ``)

  if (hex.length === 3) hex = `${hex + hex}ff`
  if (hex.length === 6) hex = `${hex}ff`

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex,
  )
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: parseInt(result[4], 16) / 255,
    }
  } else {
    throw new Error(`Invalid hex color: ${hex}`)
  }
}
