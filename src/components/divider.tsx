import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react-native'
import { DefaultTheme, useTheme } from 'styled-components/native'

export type DividerProps = BaseProps & {
  margin?: {
    top?: (theme: DefaultTheme) => number
    bottom?: (theme: DefaultTheme) => number
  }
  orientation?: 'horizontal' | 'vertical'
}

export function Divider(props: DividerProps) {
  const { margin, style, orientation = `horizontal`, ...passed } = props
  const theme = useTheme()

  const marginTop = margin?.top?.(theme)
  const marginBottom = margin?.bottom?.(theme)

  return (
    <DividerBase
      style={[style, { marginTop, marginBottom }]}
      orientation={orientation}
      {...passed}
    ></DividerBase>
  )
}

const DividerBase = themed<BaseProps & Pick<DividerProps, 'orientation'>>(
  Base,
  (p) => ({
    width: p.orientation == `horizontal` ? `100%` : 1,
    height: p.orientation == `vertical` ? `100%` : 1,
    borderTopWidth: p.orientation == `horizontal` ? 1 : 0,
    borderLeftWidth: p.orientation == `vertical` ? 1 : 0,
    borderTopColor: p.theme.protonative.colors.border.disabled,
    borderTopStyle: `solid`,
  }),
)
