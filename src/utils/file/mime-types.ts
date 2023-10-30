import { from } from '@proto-native/utils/union'
export type MimeType =
  | 'image/*'
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/gif'
  | 'image/tiff'
  | 'image/tga'
  | 'image/bmp'
  | 'image/webp'
  | 'image/pbm'
  | 'application/pdf'

export const mimeTypes = {
  image: {
    all: from<MimeType>(`image/*`),
    png: from<MimeType>(`image/png`),
    jpeg: from<MimeType>(`image/jpeg`),
    jpg: from<MimeType>(`image/jpg`),
    gif: from<MimeType>(`image/gif`),
    tiff: from<MimeType>(`image/tiff`),
    tga: from<MimeType>(`image/tga`),
    bmp: from<MimeType>(`image/bmp`),
    webp: from<MimeType>(`image/webp`),
    pbm: from<MimeType>(`image/pbm`),
  },
  application: {
    pdf: from<MimeType>(`application/pdf`),
  },
}
