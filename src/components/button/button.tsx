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
import styled, { css, DefaultTheme, useTheme } from 'styled-components/native'
import { ButtonPressAnimation, usePressAnimation } from './button-animation'

export enum ButtonType {
  Primary,
  Text,
}

export type ButtonProps = BaseProps &
  TextProps &
  PressableProps &
  Omit<PressableProps, `style`> & {
    icon?: {
      ionicons?: keyof (typeof Ionicons)[`glyphMap`]
      custom?: React.ComponentType<Partial<ButtonProps>>
    }
    pressAnimation?: ButtonPressAnimation
    type?: ButtonType
    disabled?: boolean
  }

export function Button(props: ButtonProps) {
  const { style, icon, ...rest } = props
  const theme = useTheme()
  const textProps = takeTextOwnProps(rest)
  const baseProps = takeBaseOwnProps(textProps.rest)
  const btnProps = takeButtonOwnProps(baseProps.rest)

  const flatStyle = Native.StyleSheet.flatten(style) as Record<string, any>
  const fontSize = flatStyle?.fontSize || theme.typography.size.md
  const color = flatStyle?.color || theme.colors.text.primary
  const fill = flatStyle?.fill || theme.colors.text.primary
  const stroke = flatStyle?.stroke || theme.colors.text.primary
  const fontWeight = flatStyle?.fontWeight

  const pressAnimation =
    btnProps.taken.pressAnimation || ButtonPressAnimation.None
  const anim = usePressAnimation(pressAnimation)
  const pressableStyle = [style]
  if (btnProps.taken.type !== ButtonType.Text)
    pressableStyle.push(elevation(theme))

  return (
    <ButtonBase {...baseProps.taken} style={[anim.style]}>
      <Pressable
        {...baseProps.rest}
        onTouchStart={(e) => {
          // anim.start(() => btnProps.taken?.onTouchStart?.(e))
          btnProps.taken?.onTouchStart?.(e)
        }}
        onTouchEnd={(e) => {
          // anim.revert(() => )
          btnProps.taken?.onTouchEnd?.(e)
        }}
        style={pressableStyle}
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
            style={omitBy({ color, fontSize }, isUndefined)}
          />
        )}
        {icon?.custom && (
          <icon.custom
            style={[omitBy({ color, fontSize, fill, stroke }, isUndefined)]}
          />
        )}
      </Pressable>
    </ButtonBase>
  )
}

export function takeButtonOwnProps<T extends ButtonProps>(props: T) {
  const { icon, type, onTouchStart, onTouchEnd, pressAnimation, ...rest } =
    props

  return {
    taken: { icon, type, onTouchStart, onTouchEnd, pressAnimation },
    rest,
  }
}

const ButtonBase = styled(Base)``

const Disabled = css`
  background-color: ${(p) => p.theme.colors.surface.disabled};
  color: ${(p) => p.theme.colors.text.primary};
`

const ButtonText = css`
  background-color: transparent;
  color: ${(p) => p.theme.colors.text.primary};
`

const Pressable = styled.Pressable<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.colors.surface.primary};
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: bold;
  color: ${(p) => p.theme.colors.text.light};

  ${(p) => p.disabled && Disabled}
  ${(p) => p.type === ButtonType.Text && ButtonText}
` as typeof Native.Pressable

const CardBtnText = styled(Text)`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: ${(p) =>
  Native.StyleSheet.flatten(p.parent?.props?.style)?.fontSize ||
    p.theme.typography.size.md}px;
` as typeof Text

const Icon = styled(Ionicons)`
  /* margin: auto; */
`

const elevation = (theme: DefaultTheme) =>
  Native.StyleSheet.create({
    elevation: {
      shadowColor: theme.colors.surface.contrast,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 5,
    },
  }).elevation
