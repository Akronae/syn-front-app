import { Base, BaseProps } from '@proto-native/components/base'
import { isUndefined, omitBy } from 'lodash-es'
import * as React from 'react-native'
import styled, { DefaultTheme } from 'styled-components/native'

export type TextProps = BaseProps<
  React.TextStyle,
  Omit<React.TextProps, 'onPress'>
>

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

export function getStyleBoldness(
  style: React.StyleProp<React.TextStyle>,
): number {
  const fontWeight = React.StyleSheet.flatten(style)?.fontWeight
  if (!fontWeight) return 400
  if (typeof fontWeight === `string`) {
    if (fontWeight === `bold`) return 600
    if (fontWeight === `normal`) return 400
  }
  return parseInt(fontWeight.toString())
}

export function boldnessToFont(boldness: number, theme: DefaultTheme): string {
  if (boldness <= 100) return theme.protonative.typography.font.thin
  if (boldness <= 200) return theme.protonative.typography.font.extraLight
  if (boldness <= 300) return theme.protonative.typography.font.light
  if (boldness <= 400) return theme.protonative.typography.font.regular
  if (boldness <= 500) return theme.protonative.typography.font.medium
  if (boldness <= 600) return theme.protonative.typography.font.semiBold
  if (boldness <= 700) return theme.protonative.typography.font.bold
  if (boldness <= 800) return theme.protonative.typography.font.extraBold
  return theme.protonative.typography.font.black
}

const TextWrapper = styled(Base)``

const TextBase = styled.Text<TextProps>`
  font-family: ${(p) => boldnessToFont(getStyleBoldness(p.style), p.theme)};
`

function TextCompo(props: TextProps) {
  const textOwnProps = takeTextOwnProps(props)

  const textBaseStyle = React.StyleSheet.flatten(textOwnProps.taken.style)
  let fontWeight = textBaseStyle?.fontWeight || `normal`
  if (parseInt(fontWeight) >= 700 && React.Platform.OS === `android`) {
    // Android doesn't support 700+ font weight
    fontWeight = `600`
  }

  return (
    <TextWrapper {...textOwnProps.rest}>
      <TextBase
        {...textOwnProps.taken}
        style={[textBaseStyle, { fontWeight }]}
      />
    </TextWrapper>
  )
}

export const Text = styled(TextCompo)`
  color: ${(p) => p.theme.protonative.colors.text.primary};
  font-size: ${(p) => p.theme.protonative.typography.size.md};
` as unknown as typeof TextCompo & { Inherit: typeof TextCompo }
Text.Inherit = styled(TextCompo)``
