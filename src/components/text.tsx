import { Base, BaseProps } from '@proto-native/components/base'
import { isAndroid } from '@proto-native/utils/device/is-android'
import { themed } from '@proto-native/utils/theme/themed'
import { isUndefined, omitBy } from 'lodash-es'
import * as Native from 'react-native'
import * as React from 'react'
import { DefaultTheme, useTheme } from 'styled-components/native'
import { nbsp, capitalize as capitalizeFn } from '@proto-native/utils'

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
  textTransform?: Native.TextStyle['textTransform']
  capitalize?: boolean
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
  const { children, inherits, capitalize, ...passed } = props
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
    color: theme.proto.colors.text.primary,
    fontSize: theme.proto.typography.size.md,
  }

  const formattedChildren = React.Children.map(children, (child) => {
    if (typeof child == `string`) {
      child = child
        .replaceAll(` ?`, `${nbsp}?`)
        .replaceAll(` !`, `${nbsp}!`)
        .replaceAll(` :`, `${nbsp}:`)

      if (capitalize) {
        child = capitalizeFn(child as string)
      }
    }
    return child
  })

  return (
    <TextWrapper {...textOwnProps.rest}>
      <VariantContext.Provider value={variant}>
        <TextBase
          {...textOwnProps.taken}
          style={[!inherits && baseStyle, textBaseStyle, { fontWeight }]}
          {...variant}
        >
          {formattedChildren}
        </TextBase>
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
  textTransform: p.textTransform,
  textDecorationLine: p.decoration,
}))

export function takeTextOwnProps<T extends TextProps>(props: T) {
  const { children, style, textTransform: textTransformProps, ...rest } = props
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
    taken: {
      children,
      textTransform: textTransformProps,
      style: takenStyle as Native.TextStyle,
    },
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
  if (boldness <= 100) return theme.proto.typography.font.thin
  if (boldness <= 200) return theme.proto.typography.font.extraLight
  if (boldness <= 300) return theme.proto.typography.font.light
  if (boldness <= 400) return theme.proto.typography.font.regular
  if (boldness <= 500) return theme.proto.typography.font.medium
  if (boldness <= 600) return theme.proto.typography.font.semiBold
  if (boldness <= 700) return theme.proto.typography.font.bold
  if (boldness <= 800) return theme.proto.typography.font.extraBold
  return theme.proto.typography.font.black
}
