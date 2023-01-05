import { CSSSelectors } from '@proto-native/utils'
import * as Native from 'react-native'
import Animated, { BaseAnimationBuilder } from 'react-native-reanimated'
import styled from 'styled-components/native'

export type BaseProps<
  TStyle extends Native.ViewStyle = Native.TextStyle,
  TProps extends object = Record<string, unknown>,
> = React.PropsWithChildren<TProps> &
  Omit<Animated.AnimateProps<TProps>, `style`> & {
    style?: TStyle
    showIf?: boolean
    transparent?: boolean
    selectors?: CSSSelectors
    parent?: { props?: BaseProps }
  }

export function Base<
  TStyle extends Record<string, any> = Native.ViewStyle,
  TProps extends object = Record<string, unknown>,
>(props: BaseProps<TStyle, TProps>) {
  const { children, showIf, ...passed } = props

  if (!showIf && showIf !== null && showIf !== undefined) return null

  return <BaseWrapper {...passed}>{children}</BaseWrapper>
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
