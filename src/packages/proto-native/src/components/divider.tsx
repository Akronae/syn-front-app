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
  border: 1px solid ${(p) => p.theme.colors.surface.disabled};
` as typeof Base
