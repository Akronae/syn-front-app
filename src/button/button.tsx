import { Ionicons } from '@expo/vector-icons'
import { Base, BaseProps, takeBaseOwnProps } from '@proto-native/base'
import { Text, TextProps, takeTextOwnProps } from '@proto-native/text'
import * as React from 'react-native'
import { PressableProps } from 'react-native'
import styled, { css, useTheme } from 'styled-components/native'

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
  const textProps = takeTextOwnProps(props)
  const baseProps = takeBaseOwnProps(textProps.rest)
  const btnProps = takeButtonOwnProps(baseProps.rest)

  const flatStyle = React.StyleSheet.flatten(props.style) as Record<
    string,
    unknown
  >
  const fontSize = flatStyle?.fontSize || theme.typography.size.md

  const pressAnimation =
    btnProps.taken.pressAnimation || ButtonPressAnimation.None
  const { animRevert, animStart, animStyle } = usePressAnimation(pressAnimation)

  return (
    <ButtonBase {...baseProps.taken} style={[animStyle]}>
      <Pressable
        {...baseProps.rest}
        onTouchStart={(e) => {
          btnProps.taken.onTouchStart?.(e)
          animStart()
        }}
        onTouchEnd={(e) => {
          btnProps.taken.onTouchEnd?.(e)
          animRevert()
        }}
        style={[elevation]}
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

const PressableDisabled = css`
  background-color: gray;
`

const Pressable = styled.Pressable<ButtonProps>`
  display: flex;
  flex-direction: row;
  background-color: ${(p) => p.theme.colors.surface.primary};
  margin-top: 30px;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: bold;

  ${(p) => p.disabled && PressableDisabled}
` as typeof React.Pressable

const CardBtnText = styled(Text)`
  display: flex;
  justify-content: center;
  color: #122447;
` as typeof Text

const Icon = styled(Ionicons)`
  margin-left: auto;
  color: #122447;
`


const elevation = React.StyleSheet.create({
  elevation: {
    shadowColor: `#fff`,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
}).elevation
