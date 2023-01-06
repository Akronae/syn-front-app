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
import * as React from 'react-native'
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
    icon?: keyof typeof Ionicons.glyphMap
    pressAnimation?: ButtonPressAnimation
    type?: ButtonType
    disabled?: boolean
  }

export function Button(props: ButtonProps) {
  const theme = useTheme()
  const { style, ...rest } = props
  const textProps = takeTextOwnProps(rest)
  const baseProps = takeBaseOwnProps(textProps.rest)
  const btnProps = takeButtonOwnProps(baseProps.rest)

  const flatStyle = React.StyleSheet.flatten(style) as Record<string, unknown>
  const fontSize = flatStyle?.fontSize || theme.typography.size.md

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
          <CardBtnText {...textProps.taken} parent={{ props }} />
        )}
        {btnProps.taken.icon && (
          <Icon name={btnProps.taken.icon} size={fontSize} />
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
  text-align: center;
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
` as typeof React.Pressable

const CardBtnText = styled(Text)`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0 10px;
  font-size: ${(p) =>
  React.StyleSheet.flatten(p.parent?.props?.style)?.fontSize ||
    p.theme.typography.size.md}px;
` as typeof Text

const Icon = styled(Ionicons)`
  /* margin: auto; */
`

const elevation = (theme: DefaultTheme) =>
  React.StyleSheet.create({
    elevation: {
      shadowColor: theme.colors.surface.contrast,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 5,
    },
  }).elevation
