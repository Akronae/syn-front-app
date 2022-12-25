import { PropsWithChildren } from 'react'
import * as React from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

export interface BaseProps<TStyle extends Record<string, any> = React.ViewStyle>
  extends PropsWithChildren<any>,
    React.ViewProps {
  style?: React.StyleProp<TStyle>
  showIf?: boolean
}

export const Base = (props: BaseProps) => {
  const { children, showIf, ...passed } = props

  if (!showIf && showIf !== null && showIf !== undefined) return null

  return <BaseWrapper {...passed}>{children}</BaseWrapper>
}

export function takeBaseOwnProps<T extends BaseProps>(props: T) {
  const { children, style, showIf, entering, ...rest } = props
  return { taken: { children, style, showIf, entering }, rest }
}

const BaseWrapper = styled(Animated.View)``
