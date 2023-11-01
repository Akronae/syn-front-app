import { useWindowAspectRatio } from '@proto-native/utils/use-window-aspect-ratio'
import { PropsWithChildren } from 'react'
import { getWindowAspectRatio } from './get-window-aspect-ratio'

export const isDesktopOrMore = {
  ratio: 4 / 3,
  use() {
    const r = useWindowAspectRatio()
    return r >= this.ratio
  },
  get() {
    const r = getWindowAspectRatio()
    return r >= this.ratio
  },
}

export const IsMobileOrLess = {
  ratio: 1 / 2,
  use() {
    const r = useWindowAspectRatio()
    return r <= this.ratio
  },
  get() {
    const r = getWindowAspectRatio()
    return r <= this.ratio
  },
}

const OnDesktopOrMore = ({ children }: PropsWithChildren) => {
  return <>{isDesktopOrMore.use() ? children : null}</>
}
const OnMobileOrLess = ({ children }: PropsWithChildren) => {
  return <>{!isDesktopOrMore.use() ? children : null}</>
}

function OnDesktop({ children }: PropsWithChildren) {
  return <>{isDesktopOrMore.use() ? children : null}</>
}
OnDesktop.Or = {
  More: OnDesktopOrMore,
}

function OnMobile({ children }: PropsWithChildren) {
  return <>{!isDesktopOrMore.use() ? children : null}</>
}
OnMobile.Or = {
  Less: OnMobileOrLess,
}
export const On = {
  Desktop: OnDesktop,
  Mobile: OnMobile,
}
