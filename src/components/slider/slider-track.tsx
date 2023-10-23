import { Base, BaseProps } from '@proto-native/components/base'
import * as Native from 'react-native'
import { themed, ReactiveState, isAndroid } from '@proto-native/utils'
import SvgArrangeFilterSort from '@proto-native/assets/img/icons/ArrangeFilterSort'
import * as RNGH from 'react-native-gesture-handler'
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useRef } from 'react'

export type SliderTrackProps = BaseProps & {
  gesture: RNGH.GestureType | RNGH.ComposedGesture
  trackBounds: ReactiveState<{
    x: number
    y: number
    width: number
    height: number
  }>
  thumbIndex: SharedValue<number>
  gap: ReactiveState<number>
  horizontalPadding?: number
}

export function SliderTrack(props: SliderTrackProps) {
  const {
    gesture,
    trackBounds,
    thumbIndex,
    gap,
    horizontalPadding,
    ...passed
  } = props

  const left = useRef(0)
  left.current = thumbIndex.value * gap.state + (horizontalPadding ?? 0)
  const thumbAnimStyle = useAnimatedStyle(() => ({
    left: thumbIndex.value * gap.state + (horizontalPadding ?? 0),
    position: `absolute`,
  }))

  const Handler = RNGH.gestureHandlerRootHOC(() => (
    <RNGH.GestureDetector gesture={gesture} {...passed}>
      <TrackWrapper>
        <Track />
        <Animated.View style={[thumbAnimStyle, { left: left.current }]}>
          <SliderThumb>
            <Icon />
            <SliderThumbTip />
          </SliderThumb>
        </Animated.View>
      </TrackWrapper>
    </RNGH.GestureDetector>
  ))

  return (
    <>
      <Native.View
        ref={(r) =>
          r?.measureInWindow((x, y, width, height) => {
            trackBounds.state = { x, y, width, height }
          })
        }
      />
      <Handler />
    </>
  )
}

const TrackWrapper = themed<BaseProps>(Base, (p) => ({
  display: `flex`,
  flexDirection: `row`,
  alignItems: `center`,
}))

const Track = themed<BaseProps>(Base, (p) => ({
  backgroundColor: p.theme.proto.colors.surface.sub,
  height: 24,
  borderRadius: 48,
  width: `100%`,
  borderColor: p.theme.proto.colors.border.disabled,
  borderWidth: 1,
}))

const SliderThumb = themed<BaseProps>(Base, (p) => ({
  backgroundColor: p.theme.proto.colors.surface.default,
  height: 36,
  width: 46,
  marginLeft: -23,
  borderRadius: 48,
  cursor: `pointer`,
  borderColor: p.theme.proto.colors.surface.contrast,
  borderWidth: 1,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
}))

const SliderThumbTip = themed<BaseProps>(Base, (p) => ({
  backgroundColor: p.theme.proto.colors.surface.default,
  borderColor: p.theme.proto.colors.surface.contrast,
  borderWidth: 1,
  position: `absolute`,
  bottom: -3,
  height: 6,
  width: 6,
  transform: [{ rotate: `-45deg` }],

  ...(isAndroid() && {
    borderTopColor: `transparent`,
    borderRightColor: `transparent`,
    borderLeftColor: `transparent`,
    borderEndColor: `transparent`,
  }),

  ...(!isAndroid() && {
    borderTopColor: `transparent`,
    borderRightColor: `transparent`,
    borderRadius: 2,
  }),
}))

const Icon = themed<BaseProps>(SvgArrangeFilterSort, (p) => ({
  transform: [{ rotate: `90deg` }],
  userSelect: `none`,
}))
