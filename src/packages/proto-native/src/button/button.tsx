import { ButtonPressAnimation, usePressAnimation } from './button-animation'
import { Ionicons } from '@expo/vector-icons'
import {
  Base,
  BaseProps,
  takeBaseOwnProps,
  takeTextOwnProps,
  Text,
  TextProps,
} from '@proto-native/components'
import * as React from 'react-native'
import { PressableProps } from 'react-native'
import styled, { css, DefaultTheme, useTheme } from 'styled-components/native'

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
          anim.start(() => btnProps.taken.onTouchStart?.(e))
        }}
        onTouchEnd={(e) => {
          anim.revert(() => btnProps.taken.onTouchEnd?.(e))
        }}
        style={pressableStyle}
      >
        <CardBtnText {...textProps.taken} />
        <Icon name={btnProps.taken.icon} size={fontSize} />
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
  background-color: gray;
`

const ButtonText = css`
  background-color: transparent;
  color: ${(p) => p.theme.colors.text.primary};
`

const Pressable = styled.Pressable<ButtonProps>`
  display: flex;
  flex-direction: row;
  background-color: ${(p) => p.theme.colors.surface.primary};
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: bold;
  color: #122447;

  ${(p) => p.disabled && Disabled}
  ${(p) => p.type === ButtonType.Text && ButtonText}
` as typeof React.Pressable

const CardBtnText = styled(Text)`
  display: flex;
  justify-content: center;
  color: inherit;
` as typeof Text

const Icon = styled(Ionicons)`
  margin-left: auto;
  color: inherit;
`

const elevation = (theme: DefaultTheme) =>
  React.StyleSheet.create({
    elevation: {
      shadowColor: theme.colors.surface.constrast,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 5,
    },
  }).elevation
