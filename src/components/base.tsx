import { computeCSSSelectors, CSSSelectors } from '@proto-native/utils'
import {
  MediaQueries,
  useMediaQueries,
} from '@proto-native/utils/device/use-media-queries'
import { Children, isValidElement } from 'react'
import * as Native from 'react-native'
import Animated, { BaseAnimationBuilder } from 'react-native-reanimated'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'

export type BaseProps<
  TStyle extends Native.TextStyle = Native.TextStyle,
  TProps extends Native.ViewProps = Native.ViewProps,
> = Omit<React.PropsWithChildren<TProps>, `style`> &
  Omit<Animated.AnimateProps<TProps>, `style` | `animatedProps`> & {
    style?: Native.StyleProp<TStyle>
    tStyle?: (theme: DefaultTheme) => Native.StyleProp<TStyle>
    showIf?: boolean
    transparent?: boolean
    css?: {
      selectors?: CSSSelectors
      media?: MediaQueries
    }
    parent?: { props?: BaseProps }
  }

export function Base<
  TStyle extends Native.TextStyle = Native.TextStyle,
  TProps extends Native.ViewProps = Native.ViewProps,
>(props: BaseProps<TStyle, TProps>) {
  let { children, showIf, style, tStyle: themedStyle, ...passed } = props

  const theme = useTheme()
  const mediaQueries = useMediaQueries()

  if (!showIf && showIf !== null && showIf !== undefined) return null

  children = Children.toArray(children).map((child, index, arr) => {
    if (!isValidElement(child)) return child

    const css = child.props.css ?? {}
    if (!css.selectors) css.selectors = computeCSSSelectors(child, index, arr)
    if (!css.media) css.media = mediaQueries
    return { ...child, props: { ...child.props, css } }
  })

  return (
    <BaseWrapper style={[style, themedStyle?.(theme)]} {...passed}>
      {children}
    </BaseWrapper>
  )
}

export function takeBaseOwnProps<T extends BaseProps>(props: T) {
  const { children, style, showIf, transparent, entering, ...rest } = props
  return {
    taken: {
      children,
      style,
      showIf,
      transparent,
      entering: entering as BaseAnimationBuilder,
    },
    rest,
  }
}

const BaseWrapper = styled(Animated.View)<BaseProps>`
  opacity: ${(props) => (props.transparent ? 0 : 1)};
`
