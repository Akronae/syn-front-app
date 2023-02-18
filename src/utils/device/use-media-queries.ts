import { isDesktopOrMore } from './media-queries'

export type MediaQueries = {
  desktop: {
    or: {
      more: boolean
      less: boolean
    }
  }
}

export function useMediaQueries(): MediaQueries {
  const desktopOrMore = isDesktopOrMore.use()

  return {
    desktop: {
      or: {
        more: desktopOrMore,
        less: !desktopOrMore,
      },
    },
  }
}
