import { Base, BaseProps } from '@proto-native/components/base'
import { randomInt } from '@proto-native/random'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'
import * as Native from 'react-native'
import { Text } from './text'
import Animated, {
  AnimateProps,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { range } from 'lodash-es'
import { Modal } from './modal'
import { useInterval, useState } from '@proto-native/utils'
import { useTimeout } from '@proto-native/utils/use-timeout'
import { AnchoredModal } from './anchored-modal'

export type ParticleEmitterProps = BaseProps

export const ParticleEmitter = React.forwardRef<
  typeof ParticleEmitterBase,
  ParticleEmitterProps
>((props: ParticleEmitterProps, ref) => {
  const { children, ...passed } = props

  const particles = range(0, 20).map((i) => <Particle key={i} />)

  return (
    <ParticleEmitterBase {...passed}>
      <AnchoredModal>{particles}</AnchoredModal>
    </ParticleEmitterBase>
  )
})
ParticleEmitter.displayName = `ParticleEmitter`

const ParticleEmitterBase = themed(Base, (_p) => ({}))

type ParticleProps = {
  x?: number | [number, number]
  y?: number | [number, number]
  size?: number | [number, number]
  duration?: number | [number, number]
  delay?: number | [number, number]
  color?: string
  text?: string | string[]
  destinationX?: number | [number, number]
  destinationY?: number | [number, number]
  opacity?: { from: number; to: number }
}
function Particle({
  x = [0, innerWidth],
  y = [0, innerHeight],
  size = [5, 25],
  duration = [5000, 15000],
  delay = [0, 300],
  color,
  text,
  destinationX,
  destinationY,
  opacity = { from: 1, to: 0 },
}: ParticleProps = {}) {
  if (Array.isArray(x)) x = randomInt(x[0], x[1])
  if (Array.isArray(y)) y = randomInt(y[0], y[1])
  if (Array.isArray(size)) size = randomInt(size[0], size[1])

  var dur = 0
  if (Array.isArray(duration)) dur = randomInt(duration[0], duration[1])
  else dur = duration

  if (Array.isArray(delay)) delay = randomInt(delay[0], delay[1])
  if (!color)
    color = `hsl(${randomInt(0, 360)}, ${randomInt(60, 80)}%, ${randomInt(
      50,
      85,
    )}%)`

  var dstX: number = 0
  if (!destinationX) dstX = x + (Math.random() - 0.5) * 2 * 75
  else if (Array.isArray(destinationX))
    dstX = randomInt(destinationX[0], destinationX[1])
  else dstX = destinationX

  var dstY = 0
  if (!destinationY) dstY = y + (Math.random() - 0.5) * 2 * 75
  else if (Array.isArray(destinationY))
    dstY = randomInt(destinationY[0], destinationY[1])
  else dstY = destinationY

  var selected = ''
  if (text) {
    if (Array.isArray(text)) selected = text[randomInt(0, text.length - 1)]
    else selected = text
  }

  const posX = useSharedValue(x)
  const posY = useSharedValue(y)
  const opacityVal = useSharedValue(opacity.from)
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: posX.value }, { translateY: posY.value }],
      opacity: opacityVal.value,
      position: 'absolute',
      left: 0,
      top: 0,
      borderRadius: 9999,
      pointerEvents: 'none',
      zIndex: 5,
      width: size as number,
      height: size as number,
      color: color,
      fontSize: size as number,
      backgroundColor: children ? 'transparent' : color,
    }
  })

  const start = (callback?: () => void) => {
    posX.value = x as number
    posY.value = y as number
    opacityVal.value = opacity.from

    posX.value = withSpring(dstX, { duration: dur }, callback)
    posY.value = withSpring(dstY, { duration: dur })
    opacityVal.value = withSpring(opacity.to, { duration: dur })
  }

  const children = selected ? <Text>{selected}</Text> : null
  const particle = <Animated.View style={style}>{children}</Animated.View>

  useTimeout(() => start(), delay)

  return particle
}
