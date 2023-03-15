import { computeCSSSelectors, CSSSelectors } from '@proto-native/utils'
import { isWeb } from '@proto-native/utils/device/is-web'
import {
  MediaQueries,
  useMediaQueries,
} from '@proto-native/utils/device/use-media-queries'
import * as React from 'react'
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
    onMouseDown?: Native.Touchable['onTouchStart']
    onMouseUp?: Native.Touchable['onTouchEnd']
    onTouchEnd?: Native.ViewProps['onTouchEnd']
    onPress?: Native.PressableProps['onPress']
  }

export function Base<
  TStyle extends Native.TextStyle = Native.TextStyle,
  TProps extends Native.ViewProps = Native.ViewProps,
>(props: BaseProps<TStyle, TProps>) {
  let {
    children,
    showIf,
    style,
    tStyle: themedStyle,
    onTouchEnd: onTouchEndProps,
    onPress,
    ...passed
  } = props

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

  if (isWeb()) {
    if (props.onTouchStart) passed.onMouseDown = props.onTouchStart as any
    if (props.onTouchEnd) passed.onMouseUp = props.onTouchEnd as any
  }

  const onTouchEnd = (e: Native.GestureResponderEvent) => {
    setImmediate(() => {
      onTouchEndProps?.(e)
    })
  }

  const Wrapper = BaseWrapper(props.onPress ? Native.Pressable : Animated.View)

  const isClickable = onPress || onTouchEndProps

  return (
    <Wrapper
      onTouchEnd={onTouchEnd}
      style={[
        style,
        themedStyle?.(theme),
        isClickable && ({ cursor: `pointer` } as any),
      ]}
      isClickable={isClickable}
      onPress={onPress}
      {...passed}
    >
      {children}
    </Wrapper>
  )
}

export function takeBaseOwnProps(props: BaseProps) {
  const { children, style, showIf, transparent, entering, onPress, ...rest } =
    props
  return {
    taken: {
      children,
      style,
      showIf,
      transparent,
      entering: entering as BaseAnimationBuilder,
      onPress,
    },
    rest: rest as any,
  }
}

const BaseWrapper = (t: React.ComponentType) => styled(t)<BaseProps>`
  opacity: ${(p) => (p.transparent ? 0 : 1)};
`
