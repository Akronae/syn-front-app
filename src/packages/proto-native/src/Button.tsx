import { Ionicons } from '@expo/vector-icons'
import { Base, BaseProps } from '@proto-native/base'
import { Text } from '@proto-native/text'
import * as React from 'react-native'
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import styled, { useTheme } from 'styled-components/native'

export enum ButtonPressAnimation {
  ScaleDown,
  None,
}

export type ButtonProps = BaseProps<React.TextStyle> &
  Omit<React.PressableProps, `style`> & {
    icon?: keyof typeof Ionicons.glyphMap
    pressAnimation?: ButtonPressAnimation
  }

const usePressAnimation = {
  [ButtonPressAnimation.ScaleDown]: useScaleDownPressAnimation,
  [ButtonPressAnimation.None]: () => ({
    animStyle: {},
    animStart: () => {},
    animRevert: () => {},
  }),
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
  const ownProps = takeButtonOwnProps(props)
  const { children, icon, ...takenRest } = ownProps.taken
  const fontSize =
    React.StyleSheet.flatten(takenRest.style)?.fontSize ||
    theme.typography.size.md

  const { animRevert, animStart, animStyle } =
    usePressAnimation[props.pressAnimation || ButtonPressAnimation.None]()

  return (
    <ButtonBase {...ownProps.rest} style={[animStyle]}>
      <Pressable
        {...takenRest}
        onTouchStart={() => {
          takenRest.onTouchStart?.()
          animStart()
        }}
        onTouchEnd={() => {
          takenRest.onTouchEnd?.()
          animRevert()
        }}
      >
        <CardBtnText>{children}</CardBtnText>
        <Icon name={icon} size={fontSize} />
      </Pressable>
    </ButtonBase>
  )
}

export function takeButtonOwnProps<T extends ButtonProps>(props: T) {
  const { showIf, ...taken } = props

  return {
    taken,
    rest: { showIf },
  }
}

const ButtonBase = styled(Base)``

const Pressable = styled.Pressable`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => `#3f83df`};
  color: #122447;
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
