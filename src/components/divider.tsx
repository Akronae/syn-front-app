import { Base, BaseProps } from '@proto-native/components/base'
import { createThemedComponent } from '@proto-native/utils/theme/create-themed-component'
import * as React from 'react-native'
import { DefaultTheme, useTheme } from 'styled-components/native'

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

const DividerBase = createThemedComponent(Base, (p) => ({
  width: `100%`,
  borderTopWidth: 1,
  borderTopColor: p.theme.protonative.colors.border.disabled,
  borderTopStyle: `solid`,
}))
