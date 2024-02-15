import { hexToRgba } from './hex-to-rgba'

export function luminance(color: string): number {
  const rgb = hexToRgba(color)
  const R = rgb.r / 255
  const G = rgb.g / 255
  const B = rgb.b / 255

  const linear = (n: number) =>
    n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4)

  // For the sRGB colorspace, the relative luminance of a color is defined as:
  const L = 0.2126 * linear(R) + 0.7152 * linear(G) + 0.0722 * linear(B)

  return L
}
