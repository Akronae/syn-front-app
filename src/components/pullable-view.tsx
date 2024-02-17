import { ViewProps } from '@proto-native'
import { View } from '@proto-native'
import * as React from 'react'

import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { isWeb } from 'src/packages/proto-native/src/utils/device/is-web'

export type PullableViewProps = ViewProps & {
  onPull?: (direction: 'up' | 'down') => void
  enable?: boolean
  gestureRef?: React.MutableRefObject<any>
}
export function PullableView(props: PullableViewProps) {
  const { children, onPull, enable, gestureRef: touchRef, ...passed } = props
  const ACTIVATION = 200

  const pulled = useSharedValue(0)

  const chipStyle = useAnimatedStyle(() => ({
    margin: `auto`,
    ...(pulled.value < 0
      ? { bottom: -pulled.value * 0.5, top: undefined }
      : pulled.value > 0
        ? { top: pulled.value * 0.5, bottom: undefined }
        : {}),
    transform: [{ scale: (-pulled.value / ACTIVATION) * 0.5 }],
    right: `0%`,
    left: `0%`,
    opacity: Math.abs(pulled.value / ACTIVATION),
    position: `absolute`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
  }))

  const lastFeedback = useSharedValue(0)
  const feedback = () => {
    if (Date.now() - lastFeedback.value < 1000) return
    lastFeedback.value = Date.now()

    if (!isWeb()) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  const gesture = Gesture.Pan()
    .onEnd((e) => {
      pulled.value = 0
      if (enable && Math.abs(e.translationY) > ACTIVATION) {
        if (onPull) runOnJS(onPull)(e.translationY > 0 ? `down` : `up`)
      }
    })
    .onChange((e) => {
      if (enable) {
        pulled.value = e.translationY
        if (
          Math.abs(pulled.value) > ACTIVATION &&
          Math.abs(pulled.value) < ACTIVATION + 50
        ) {
          runOnJS(feedback)()
        }
      }
    })

  if (touchRef) gesture.withRef(touchRef)

  return (
    <View {...passed}>
      <GestureDetector gesture={gesture}>{children}</GestureDetector>
      <Animated.View style={chipStyle}>
        <Ionicons name='arrow-down' color={`white`} size={100} />
      </Animated.View>
    </View>
  )
}
