import { hexToRgba } from './hex-to-rgba'

export function luminance(color: string): number {
  const rgb = hexToRgba(color)
  const RsRGB = rgb.r / 255
  const GsRGB = rgb.g / 255
  const BsRGB = rgb.b / 255
  const R =
    RsRGB <= 0.03928 ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4)
  const G =
    GsRGB <= 0.03928 ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4)
  const B =
    BsRGB <= 0.03928 ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4)

  // For the sRGB colorspace, the relative luminance of a color is defined as:
  const L = 0.2126 * R + 0.7152 * G + 0.0722 * B

  return L
}
