import { Base, BaseProps } from '@proto-native/components/base'
import * as React from 'react-native'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'

export type DividerProps = BaseProps & {
  margin?: {
    top?: (theme: DefaultTheme) => number
    bottom?: (theme: DefaultTheme) => number
  }
}

export function Divider(props: DividerProps) {
  const { margin, style, ...passed } = props
  const theme = useTheme()

  const marginTop = margin?.top?.(theme)
  const marginBottom = margin?.bottom?.(theme)

  return (
    <DividerBase
      style={[style, { marginTop, marginBottom }]}
      {...passed}
    ></DividerBase>
  )
}

const DividerBase = styled(Base)`
  width: 100%;
  border-top-width: 1px;
  border-top-color: ${(p) => p.theme.protonative.colors.border.disabled};
  border-top-style: solid;
` as typeof Base
