import { Ionicons } from '@expo/vector-icons'
import { Base, BaseProps, takeBaseOwnProps } from '@proto-native/base'
import { Text, TextProps, takeTextOwnProps } from '@proto-native/text'
import * as React from 'react-native'
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import styled, { useTheme } from 'styled-components/native'

export enum ButtonPressAnimation {
  None,
  ScaleDown,
}

export type ButtonProps = BaseProps &
  TextProps &
  React.PressableProps &
  Omit<React.PressableProps, `style`> & {
    icon?: keyof typeof Ionicons.glyphMap
    pressAnimation?: ButtonPressAnimation
  }

function usePressAnimation(animation: ButtonPressAnimation) {
  const anims = {
    [ButtonPressAnimation.ScaleDown]: useScaleDownPressAnimation(),
    [ButtonPressAnimation.None]: {
      animStyle: {},
      animStart: () => {},
      animRevert: () => {},
    },
  }

  return anims[animation]
}

function useScaleDownPressAnimation() {
  const scale = useSharedValue(1)
  const scaleFrom = 1
  const scaleTo = 0.97
  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })
  const isBeingPressed = useSharedValue(false)
  const animStart = () => {
    isBeingPressed.value = true
    scale.value = withSpring(scale.value * scaleTo, undefined, () => {
      if (!isBeingPressed.value) {
        scale.value = scaleFrom
      }
    })
  }
  const animRevert = () => {
    isBeingPressed.value = false
    if (scale.value != scaleTo) return
    scale.value = withSpring((scale.value = scaleFrom))
  }

  return { animStyle, animStart, animRevert }
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
      >
        <CardBtnText {...textProps.taken} />
        <Icon name={btnProps.taken.icon} size={fontSize} />
      </Pressable>
    </ButtonBase>
  )
}

export function takeButtonOwnProps<T extends ButtonProps>(props: T) {
  const { icon, onTouchStart, onTouchEnd, pressAnimation, ...rest } = props

  return {
    taken: { icon, onTouchStart, onTouchEnd, pressAnimation },
    rest,
  }
}

const ButtonBase = styled(Base)``

const Pressable = styled.Pressable`
  display: flex;
  flex-direction: row;
  background-color: ${(p) => p.theme.colors.surface.primary};
  margin-top: 30px;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: bold;
`

const CardBtnText = styled(Text)`
  display: flex;
  justify-content: center;
  color: #122447;
`

const Icon = styled(Ionicons)`
  margin-left: auto;
  color: #122447;
`
