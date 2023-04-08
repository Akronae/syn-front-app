import { Ionicons } from '@expo/vector-icons'
import { Base, BaseProps } from '@proto-native/components/base'
import {
  takeTextOwnProps,
  Text,
  TextProps,
} from '@proto-native/components/text'
import { themed } from '@proto-native/utils/theme/themed'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'
import { isUndefined, omitBy } from 'lodash-es'
import * as React from 'react'
import * as Native from 'react-native'
import Animated from 'react-native-reanimated'
import { useTheme } from 'styled-components/native'
import { ButtonPressAnimation, usePressAnimation } from './button-animation'

export type ButtonType = `primary` | `secondary` | `text`

export type ButtonProps = BaseProps<Native.ViewStyle & { stroke?: string, fill?: string }, Native.TextStyle> &
  Omit<TextProps, 'style'> &
  Omit<Native.ViewProps, 'style'> & {
    icon?: {
      style?: Native.StyleProp<Native.ViewStyle & { stroke?: string, fill?: string }>
      ionicons?: keyof (typeof Ionicons)[`glyphMap`]
      custom?: React.ComponentType<Partial<ButtonProps>>
      position?: `left` | `right`
    }
    pressAnimation?: ButtonPressAnimation
    type?: ButtonType
    disabled?: boolean
  }

export function Button(props: ButtonProps) {
  const { icon, ...rest } = props
  const style = props.style
  const theme = useTheme()
  const btnProps = takeButtonOwnProps(rest)
  const textProps = takeTextOwnProps(btnProps.rest)

  const flatStyle = Native.StyleSheet.flatten(style) as Record<string, any>
  const fontSize = flatStyle?.fontSize || theme.protonative.typography.size.md
  const color = flatStyle?.color || theme.protonative.colors.text.primary
  const fill = flatStyle?.fill || color
  const stroke = flatStyle?.stroke || color
  const fontWeight = flatStyle?.fontWeight

  const pressAnimation = btnProps.taken.pressAnimation || `none`
  const anim = usePressAnimation(pressAnimation)

  const IconComponent = () => (
    <>
      {icon?.ionicons && (
        <Icon
          name={icon.ionicons}
          style={Native.StyleSheet.flatten([icon.style, omitBy({ color, fontSize }, isUndefined)])}
        />
      )}
      {icon?.custom && (
        <icon.custom
          style={Native.StyleSheet.flatten([
            icon.style,
            omitBy({ color, fontSize, stroke }, isUndefined),
          ])}
        />
      )}
    </>
  )

  return (
    <Animated.View style={anim.style}>
      <ButtonBase
        {...textProps.rest}
        {...btnProps.taken}
        style={[btnProps.taken.style, textProps.rest.style]}
        onTouchStart={(e) => {
          anim.start(() => btnProps.taken?.onTouchStart?.(e))
        }}
        onTouchEnd={(e) => {
          anim.revert(() => btnProps.taken?.onTouchEnd?.(e))
        }}
      >
        {icon?.position !== `right` && <IconComponent />}
        {textProps.taken.children && (
          <CardBtnText
            {...textProps.taken}
            style={[{ color, fontWeight }, textProps.taken.style]}
            parent={{ props }}
          />
        )}
        {icon?.position === `right` && <IconComponent />}
      </ButtonBase>
    </Animated.View>
  )
}

export function takeButtonOwnProps<T extends ButtonProps>(props: T) {
  const {
    icon,
    type,
    disabled,
    onTouchStart,
    onTouchEnd,
    onPress,
    pressAnimation,
    style,
    ...rest
  } = props

  const flattenStyle = Native.StyleSheet.flatten(style)
  const {
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    ...styleRest
  } = flattenStyle
  const styleTaken = omitBy(
    { padding, paddingTop, paddingRight, paddingBottom, paddingLeft },
    isUndefined,
  )

  return {
    taken: {
      icon,
      type,
      disabled,
      onTouchStart,
      onTouchEnd,
      onPress,
      pressAnimation,
      style: styleTaken,
    },
    rest: { ...rest, style: styleRest },
  }
}

const ButtonBase = themed<ButtonProps>(Base, (p) => ({
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `center`,
  textAlign: `center`,
  backgroundColor: p.theme.protonative.colors.surface.primary,
  borderRadius: 8,
  fontWeight: `bold`,
  color: p.theme.protonative.colors.text.light,
  paddingVertical: 10,
  paddingHorizontal: 15,
  ...(p.disabled && Disabled),
  ...(p.type === `text` && ButtonText),
}))

const Disabled: ThemedStyle = (p) => ({
  backgroundColor: p.theme.protonative.colors.surface.disabled,
  color: p.theme.protonative.colors.text.primary,
})

const ButtonText: ThemedStyle = (p) => ({
  backgroundColor: `transparent`,
  color: p.theme.protonative.colors.text.primary,
})

const CardBtnText = themed<TextProps>(Text, (p) => ({
  fontSize:
    Native.StyleSheet.flatten(p.parent?.props?.style)?.fontSize ||
    p.theme.protonative.typography.size.md,
}))

const Icon = Ionicons
