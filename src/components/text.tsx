import { Base, BaseProps } from '@proto-native/components/base'
import { isAndroid } from '@proto-native/utils/device/is-android'
import { themed } from '@proto-native/utils/theme/themed'
import { isUndefined, omitBy } from 'lodash-es'
import * as Native from 'react-native'
import * as React from 'react'
import { DefaultTheme, useTheme } from 'styled-components/native'

export type TextType = 'normal' | 'bold'
export type TextDecoration = 'underline' | undefined
export type TextVariant = {
  bold: boolean
  decoration: TextDecoration
}
export type TextProps = BaseProps<
  Native.TextStyle,
  Omit<Native.TextProps, 'onPress'>
> & {
  inherits?: boolean
} & Partial<TextVariant>

const VariantContext = React.createContext<TextVariant | undefined>(undefined)
export function useVariant(props: TextProps) {
  const { bold, decoration } = props
  const parentVariant = React.useContext(VariantContext)
  const variant: TextVariant = {
    bold: bold ?? parentVariant?.bold ?? false,
    decoration: decoration ?? parentVariant?.decoration,
  }

  return variant
}

export function Text(props: TextProps) {
  const { inherits, ...passed } = props
  const textOwnProps = takeTextOwnProps(passed)
  const theme = useTheme()

  const variant = useVariant(props)

  const textBaseStyle = Native.StyleSheet.flatten(textOwnProps.taken.style)
  let fontWeight = textBaseStyle?.fontWeight || `normal`
  if (isAndroid() && parseInt(fontWeight) >= 700) {
    // Android doesn't support 700+ font weight
    fontWeight = `600`
  }
  if (variant.bold) fontWeight = `bold`

  const baseStyle = {
    color: theme.protonative.colors.text.primary,
    fontSize: theme.protonative.typography.size.md,
  }

  return (
    <TextWrapper {...textOwnProps.rest}>
      <VariantContext.Provider value={variant}>
        <TextBase
          {...textOwnProps.taken}
          style={[!inherits && baseStyle, textBaseStyle, { fontWeight }]}
          {...variant}
        />
      </VariantContext.Provider>
    </TextWrapper>
  )
}
Text.Inherits = TextInherits as typeof Text
function TextInherits(p: TextProps) {
  return <Text inherits {...p} />
}

const TextWrapper = Base

const TextBase = themed<TextProps>(Native.Text, (p) => ({
  fontFamily: boldnessToFont(getStyleBoldness(p.style), p.theme),
  ...(p.decoration == `underline` && { textDecorationLine: `underline` }),
}))

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
    textDecorationLine,
    textAlign,
    ...styleRest
  } = Native.StyleSheet.flatten(style || [])

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
      textDecorationLine,
      textAlign,
    },
    isUndefined,
  )

  return {
    taken: { children, style: takenStyle as Native.TextStyle },
    rest: { ...rest, style: styleRest } as any,
  }
}

export function getStyleBoldness(
  style: Native.StyleProp<Native.TextStyle>,
): number {
  const fontWeight = Native.StyleSheet.flatten(style)?.fontWeight
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
