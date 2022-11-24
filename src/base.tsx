import { PropsWithChildren } from 'react'
import * as React from 'react-native'
import styled from 'styled-components/native'

export interface BaseProps extends PropsWithChildren<any> {
  style?: React.StyleProp<React.ViewStyle>
  showIf?: boolean
}

export function Base(props: BaseProps) {
  const { children, showIf, ...passed } = props

  if (!showIf && showIf !== null && showIf !== undefined) return null

  return <BaseWrapper {...passed}>{children}</BaseWrapper>
}

export function takeBaseOwnProps<T extends BaseProps>(props: T) {
  const { children, style, showIf, ...rest } = props
  return { taken: { children, style, showIf }, rest }
}

const BaseWrapper = styled.View``
