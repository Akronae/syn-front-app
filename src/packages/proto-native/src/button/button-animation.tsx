import { Ionicons } from "@expo/vector-icons"
import { BaseProps } from "@proto-native/base"
import { TextProps } from "@proto-native/text"
import { PressableProps } from "react-native"
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export enum ButtonPressAnimation {
  None,
  ScaleDown,
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

export function usePressAnimation(animation: ButtonPressAnimation) {
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
