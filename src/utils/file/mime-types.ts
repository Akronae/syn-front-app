import { from } from '@proto-native/utils/union'

export type MimeType = 'image/*' | 'application/pdf'

export const mimeTypes = {
  image: {
    all: from<MimeType>(`image/*`),
  },
  application: {
    pdf: from<MimeType>(`application/pdf`),
  },
}
