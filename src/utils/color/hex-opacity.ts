import { hexToRgba } from './hex-to-rgba'
import { rgbaToHex } from './rgba-to-hex'

export function hexOpacity(hex: string, opacity: number): string {
  const rgba = hexToRgba(hex)
  rgba.a = opacity
  return rgbaToHex(rgba)
}
