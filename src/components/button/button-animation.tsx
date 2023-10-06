import { StyleProp, ViewStyle } from 'react-native'
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export type ButtonPressAnimation = 'none' | 'scale-down'

export type AnimationHandle = {
  style: StyleProp<ViewStyle>
  start: (callback?: () => void) => void
  revert: (callback?: () => void) => void
}

function useScaleDownPressAnimation(): AnimationHandle {
  const scale = useSharedValue(1)
  const scaleFrom = 1
  const scaleTo = 0.97
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const isBeingPressed = useSharedValue(false)
  const start = (callback?: () => void) => {
    isBeingPressed.value = true
    scale.value = withSpring(scale.value * scaleTo, undefined, () => {
      if (!isBeingPressed.value) {
        scale.value = scaleFrom
      }
      if (callback) runOnJS(callback)()
    })
  }

  const revert = (callback?: () => void) => {
    isBeingPressed.value = false
    if (scale.value != scaleTo) return
    scale.value = withSpring((scale.value = scaleFrom), undefined, () => {
      if (callback) runOnJS(callback)()
    })
  }

  return { style, start, revert }
}

export function usePressAnimation(
  animation: ButtonPressAnimation,
): AnimationHandle {
  const anims: Record<ButtonPressAnimation, AnimationHandle> = {
    'scale-down': useScaleDownPressAnimation(),
    none: {
      style: {},
      start: () => {},
      revert: () => {},
    },
  }

  return anims[animation]
}
