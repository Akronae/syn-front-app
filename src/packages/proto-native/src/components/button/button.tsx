import { ButtonPressAnimation, usePressAnimation } from './button-animation'
import { Ionicons } from '@expo/vector-icons'
import {
  Base,
  BaseProps,
  takeBaseOwnProps,
} from '@proto-native/components/base'
import {
  takeTextOwnProps,
  Text,
  TextProps,
} from '@proto-native/components/text'
import { isUndefined, omitBy } from 'lodash-es'
import * as React from 'react'
import * as Native from 'react-native'
import { PressableProps } from 'react-native'
import styled, { css, useTheme } from 'styled-components/native'

export type ButtonType = `primary` | `secondary` | `text`

export type ButtonProps = BaseProps &
  TextProps &
  PressableProps &
  Omit<PressableProps, `style`> & {
    icon?: {
      style?: Native.StyleProp<Native.ViewStyle>
      ionicons?: keyof typeof Ionicons[`glyphMap`]
      custom?: React.ComponentType<Partial<ButtonProps>>
    }
    pressAnimation?: ButtonPressAnimation
    type?: ButtonType
    disabled?: boolean
  }

export function Button(props: ButtonProps) {
  const { icon, ...rest } = props
  const style = props.style
  const theme = useTheme()
  const textProps = takeTextOwnProps(rest)
  const baseProps = takeBaseOwnProps(textProps.rest)
  const btnProps = takeButtonOwnProps(baseProps.rest)

  const flatStyle = Native.StyleSheet.flatten(style) as Record<string, any>
  const fontSize = flatStyle?.fontSize || theme.protonative.typography.size.md
  const color = flatStyle?.color || theme.protonative.colors.text.primary
  const fill = flatStyle?.fill || color
  const stroke = flatStyle?.stroke || color
  const fontWeight = flatStyle?.fontWeight

  const pressAnimation = btnProps.taken.pressAnimation || `none`
  const anim = usePressAnimation(pressAnimation)

  const pressableWebPolyfill = {
    onClick: props.onPress,
    onMouseDown: props.onTouchStart,
    onMouseUp: props.onTouchEnd,
  }

  return (
    <ButtonBase
      {...baseProps.taken}
      {...btnProps.taken}
      style={[anim.style, baseProps.taken.style]}
    >
      <Pressable
        {...pressableWebPolyfill}
        {...baseProps.rest}
        onTouchStart={(e) => {
          anim.start(() => btnProps.taken?.onTouchStart?.(e))
        }}
        onTouchEnd={(e) => {
          anim.revert(() => btnProps.taken?.onTouchEnd?.(e))
        }}
      >
        {textProps.taken.children && (
          <CardBtnText
            {...textProps.taken}
            style={[{ color, fontWeight }, textProps.taken.style]}
            parent={{ props }}
          />
        )}
        {icon?.ionicons && (
          <Icon
            name={icon.ionicons}
            style={[icon.style, omitBy({ color, fontSize }, isUndefined)]}
          />
        )}
        {icon?.custom && (
          <icon.custom
            style={[
              icon.style,
              omitBy({ color, fontSize, fill, stroke }, isUndefined),
            ]}
          />
        )}
      </Pressable>
    </ButtonBase>
  )
}

export function takeButtonOwnProps<T extends ButtonProps>(props: T) {
  const {
    icon,
    type,
    onTouchStart,
    onTouchEnd,
    onPress,
    pressAnimation,
    ...rest
  } = props

  return {
    taken: { icon, type, onTouchStart, onTouchEnd, onPress, pressAnimation },
    rest,
  }
}

const ButtonBase = styled(Base)<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.protonative.colors.surface.primary};
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: bold;
  color: ${(p) => p.theme.protonative.colors.text.light};

  ${(p) => p.disabled && Disabled}
  ${(p) => p.type === `text` && ButtonText}
`

const Disabled = css`
  background-color: ${(p) => p.theme.protonative.colors.surface.disabled};
  color: ${(p) => p.theme.protonative.colors.text.primary};
`

const ButtonText = css`
  background-color: transparent;
  color: ${(p) => p.theme.protonative.colors.text.primary};
`

const Pressable = styled.Pressable<ButtonProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  text-align: center;
` as typeof Native.Pressable

const CardBtnText = styled(Text)`
  font-size: ${(p) =>
  Native.StyleSheet.flatten(p.parent?.props?.style)?.fontSize ||
    p.theme.protonative.typography.size.md}px;
` as typeof Text

const Icon = styled(Ionicons)`
  /* margin: auto; */
`
