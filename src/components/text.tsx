import { Base, BaseProps } from '@proto-native/components/base'
import { isUndefined, omitBy } from 'lodash-es'
import * as React from 'react-native'
import styled, { DefaultTheme } from 'styled-components/native'

export type TextProps = BaseProps<React.TextStyle> & React.TextProps

export function takeTextOwnProps<T extends TextProps>(props: T) {
  const { children, style, ...rest } = props
  const {
    color,
    fontWeight,
    fontSize,
    fontFamily,
    lineHeight,
    textTransform,
    letterSpacing,
    textDecorationColor,
    textAlign,
    ...styleRest
  } = React.StyleSheet.flatten(style || [])
  const takenStyle = omitBy(
    {
      color,
      fontWeight,
      fontSize,
      fontFamily,
      lineHeight,
      textTransform,
      letterSpacing,
      textDecorationColor,
      textAlign,
    },
    isUndefined,
  )

  return {
    taken: { children, style: takenStyle as React.TextStyle },
    rest: { ...rest, style: styleRest },
  }
}

function getStyleBoldness(style: React.StyleProp<React.TextStyle>): number {
  const fontWeight = React.StyleSheet.flatten(style)?.fontWeight
  if (!fontWeight) return 400
  if (typeof fontWeight === `string`) {
    if (fontWeight === `bold`) return 700
    if (fontWeight === `normal`) return 400
  }
  return parseInt(fontWeight.toString())
}

export function boldnessToFont(boldness: number, theme: DefaultTheme): string {
  if (boldness < 400) return theme.typography.font.light
  if (boldness >= 600) return theme.typography.font.bold
  return theme.typography.font.regular
}

const TextWrapper = styled(Base)``

const TextBase = styled.Text<TextProps>`
  font-family: ${(p) => boldnessToFont(getStyleBoldness(p.style), p.theme)};
`

function TextCompo(props: TextProps) {
  const textOwnProps = takeTextOwnProps(props)

  return (
    <TextWrapper {...textOwnProps.rest}>
      <TextBase {...textOwnProps.taken} />
    </TextWrapper>
  )
}

export const Text = styled(TextCompo)`
  color: ${(p) => p.theme.colors.text.primary};
  font-size: ${(p) => p.theme.typography.size.md};
` as unknown as typeof TextCompo & { Inherit: typeof TextCompo }
Text.Inherit = styled(TextCompo)``
