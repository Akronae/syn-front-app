import { Ionicons } from '@expo/vector-icons'
import { Base, BaseProps } from '@proto-native/components/base'
import {
  takeTextOwnProps,
  Text,
  TextProps,
} from '@proto-native/components/text'
import { themed } from '@proto-native/utils/theme/themed'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'
import { isUndefined, omit, omitBy } from 'lodash-es'
import * as React from 'react'
import * as Native from 'react-native'
import Animated from 'react-native-reanimated'
import { useTheme } from 'styled-components/native'
import { ButtonPressAnimation, usePressAnimation } from './button-animation'

export type ButtonState = `default` | `disabled` | `hover` | `pressed`
export type ButtonType = `primary` | `secondary` | `text`
export type ButtonSize = `sm` | `md` | `lg`
export type ButtonVariant = {
  state: ButtonState
  type: ButtonType
  size: ButtonSize
}

export type ButtonProps = BaseProps<
  Native.ViewStyle & { stroke?: string; fill?: string },
  Native.TextStyle
> &
  Omit<TextProps, 'style'> &
  Omit<Native.ViewProps, 'style'> & {
    icon?: {
      style?: Native.StyleProp<
        Native.ViewStyle & { stroke?: string; fill?: string }
      >
      ionicons?: keyof (typeof Ionicons)[`glyphMap`]
      custom?: React.ComponentType<Partial<ButtonProps>>
      position?: `left` | `right`
    }
    pressAnimation?: ButtonPressAnimation
  } & Partial<ButtonVariant>

export function Button(props: ButtonProps) {
  const { icon, state, type, size, ...rest } = props
  const theme = useTheme()
  const btnProps = takeButtonOwnProps(rest)
  const textProps = takeTextOwnProps(btnProps.rest)
  const pressAnimation = btnProps.taken.pressAnimation || `none`
  const anim = usePressAnimation(pressAnimation)
  const style = props.style
  const variant: ButtonVariant = {
    state: state || `default`,
    type: type || `primary`,
    size: size || `md`,
  }

  const flatStyle = Native.StyleSheet.flatten(style) as Record<string, any>
  const fontSize = flatStyle?.fontSize
  const color = flatStyle?.color
  const stroke = flatStyle?.stroke || color
  const fontWeight = flatStyle?.fontWeight

  const iconStyle = omitBy(
    {
      color: color || theme.protonative.colors.text.primary,
      fontSize: fontSize || theme.protonative.typography.size.md,
      stroke,
    },
    isUndefined,
  )

  const containerStyle: Native.ViewStyle = {
    flexGrow: flatStyle.flexGrow,
    flexShrink: flatStyle.flexShrink,
    flexBasis: flatStyle.flexBasis,
    width: flatStyle.width,
    height: flatStyle.height,
    alignSelf: flatStyle.alignSelf,
  }

  const IconComponent = () => (
    <>
      {icon?.ionicons && (
        <Icon
          name={icon.ionicons}
          style={Native.StyleSheet.flatten([
            icon.style,
            omit(iconStyle, [`stroke`]),
          ])}
        />
      )}
      {icon?.custom && (
        <icon.custom
          style={Native.StyleSheet.flatten([icon.style, iconStyle])}
        />
      )}
    </>
  )

  return (
    <Native.View style={containerStyle}>
      <Animated.View style={anim.style}>
        <ButtonBase
          {...textProps.rest}
          {...btnProps.taken}
          {...variant}
          style={[btnProps.taken.style, textProps.rest.style]}
          onPressIn={(e) => {
            anim.start()
            props.onPressIn?.(e)
          }}
          onPressOut={(e) => {
            anim.revert()
            props.onPressOut?.(e)
          }}
        >
          {icon?.position !== `right` && <IconComponent />}
          {textProps.taken.children && (
            <BtnCardText
              {...textProps.taken}
              {...variant}
              style={[
                omitBy({ color, fontWeight, fontSize }, isUndefined),
                textProps.taken.style,
              ]}
              parent={{ props }}
            />
          )}
          {icon?.position === `right` && <IconComponent />}
        </ButtonBase>
      </Animated.View>
    </Native.View>
  )
}

export function takeButtonOwnProps<T extends ButtonProps>(props: T) {
  const {
    icon,
    type,
    disabled,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    onTouchEndCapture,
    onTouchMove,
    onPressOut,
    onPressIn,
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
      onTouchCancel,
      onTouchEndCapture,
      onTouchMove,
      onPressOut,
      onPressIn,
      onPress,
      pressAnimation,
      style: styleTaken,
    },
    rest: { ...rest, style: styleRest },
  }
}

const ButtonBase = themed<BaseProps & ButtonVariant>(Base, (p) => ({
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  gap: p.theme.protonative.spacing(3),
  textAlign: `center`,
  backgroundColor: p.theme.protonative.colors.surface.primary,
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 15,
  ...(p.state == `disabled` && StateDisabled(p)),
  ...(p.type === `text` && StateText(p)),
  ...(p.type === `secondary` && StateSecondary(p)),
}))

const StateDisabled: ThemedStyle = (p) => ({
  backgroundColor: p.theme.protonative.colors.surface.disabled,
  color: p.theme.protonative.colors.text.primary,
})

const StateText: ThemedStyle = (p) => ({
  backgroundColor: `transparent`,
  color: p.theme.protonative.colors.text.primary,
})

const StateSecondary: ThemedStyle = (p) => ({
  backgroundColor: p.theme.protonative.colors.surface.sub,
  color: p.theme.protonative.colors.text.primary,
})

const BtnCardText = themed<BaseProps & ButtonVariant>(Text, (p) => {
  return {
    fontSize: p.theme.protonative.typography.size[p.size],
    fontWeight: `500`,
    color: p.theme.protonative.colors.text.light,
  }
})

const Icon = Ionicons
