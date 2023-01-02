import { CSSSelectors } from '@proto-native/utils'
import { PropsWithChildren } from 'react'
import * as React from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

export type BaseProps<
  TStyle extends Record<string, any> = React.ViewStyle,
  TProps = unknown,
> = PropsWithChildren<TProps> &
  React.ViewProps &
  Animated.AnimateProps<React.ViewProps> & {
    style?: React.StyleProp<TStyle>
    showIf?: boolean
    transparent?: boolean
    selectors?: CSSSelectors
  }

export function Base<
  TStyle extends Record<string, any> = React.ViewStyle,
  TProps = unknown,
>(props: BaseProps<TStyle, TProps>) {
  const { children, showIf, ...passed } = props

  if (!showIf && showIf !== null && showIf !== undefined) return null

  return <BaseWrapper {...passed}>{children}</BaseWrapper>
}

export function takeBaseOwnProps<T extends BaseProps>(props: T) {
  const { children, style, showIf, transparent, entering, ...rest } = props
  return { taken: { children, style, showIf, transparent, entering }, rest }
}

const BaseWrapper = styled(Animated.View)<BaseProps>`
  opacity: ${(props) => (props.transparent ? 0 : 1)};
`
