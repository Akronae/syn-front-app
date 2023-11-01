import { IsMobileOrLess, isDesktopOrMore } from './media-queries'

export type MediaQueries = {
  mobile: {
    or: {
      more: boolean
      less: boolean
    }
  }
  desktop: {
    or: {
      more: boolean
      less: boolean
    }
  }
}

export function useMediaQueries(): MediaQueries {
  const desktopOrMore = isDesktopOrMore.use()
  const mobileOrLess = IsMobileOrLess.use()

  return {
    mobile: {
      or: {
        more: !mobileOrLess,
        less: mobileOrLess,
      },
    },
    desktop: {
      or: {
        more: desktopOrMore,
        less: !desktopOrMore,
      },
    },
  }
}
