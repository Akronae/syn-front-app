import { Portal } from '@gorhom/portal'
import { Base, BaseProps } from '@proto-native/components/base'
import {
  hexOpacity,
  isIos,
  ReactiveState,
  useExistingStateOr,
} from '@proto-native/utils'
import { themed } from '@proto-native/utils/theme/themed'
import * as Native from 'react-native'
import * as React from 'react'
import * as RNGH from 'react-native-gesture-handler'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  useWindowDimensions,
} from 'react-native'
import { ScrollView } from './scroll-view'

export type BottomSheetProps = BaseProps & {
  open?: ReactiveState<boolean>
  overlay?: {
    style?: Native.ViewStyle
  }
  sheet?: {
    topNotch?: {
      style?: Native.ViewStyle
      slot?: React.ReactNode
    }
    container?: {
      style?: Native.ViewStyle
    }
    content?: {
      style?: Native.ViewStyle
    }
    footer?: {
      style?: Native.ViewStyle
    }
  }
  footer?: (props: any) => React.ReactNode
}

export function BottomSheet(props: BottomSheetProps) {
  const { children, open: openProps, sheet, overlay, footer, ...passed } = props
  const open = useExistingStateOr(openProps, true)
  const { height } = useWindowDimensions()

  const y = useSharedValue(1000)
  const yAnimGoTo = 1000
  const yAnimDur = 400
  const yDur = useSharedValue(0)
  const sheetScrollEnabled = useSharedValue(true)
  const yAnimCallback = () => {
    if (!open.state || y.value == yAnimGoTo) {
      runOnJS(close)()
    }
  }
  const yAnimReset = () => {
    // on web an assignment, even if the value does not change
    // will trigger the animation -> loop
    if (y.value != yAnimGoTo) y.value = yAnimGoTo
    if (yDur.value != 0) yDur.value = 0
  }
  const close = () => {
    open.state = false
    yAnimReset()
  }

  React.useEffect(() => {
    y.value = open.state ? 0 : 1000
    yDur.value = open.state ? 300 : 0
  }, [open.state])

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(
          y.value,
          { duration: yDur.value, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
          runOnJS(yAnimCallback),
        ),
      },
    ],
    // height: `100%`,
    // width: `100%`,
    // position: 'absolute',
  }))

  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: '#000000',
    position: `absolute`,
    left: 0,
    bottom: 0,
    width: `100%`,
    height: `100%`,
    opacity: 0.5 - y.value / yAnimGoTo,
    cursor: `pointer`,
    ...overlay?.style,
  }))

  const pan = RNGH.Gesture.Pan()
    .onChange((e) => {
      if (!sheetScrollEnabled.value) return
      yDur.value = 0
      if (e.translationY < 0) return
      y.value = e.translationY
    })
    .onEnd((e) => {
      if (!sheetScrollEnabled.value) return
      if (e.velocityY > 1000 || e.translationY / height > 0.2) {
        yDur.value = yAnimDur
        y.value = yAnimGoTo
      } else {
        y.value = 0
      }
    })

  return (
    <BottomSheetBase showIf={open.state} {...passed}>
      <Portal hostName='bottom-sheet'>
        <Background
          onClick={close}
          onTouchEnd={close}
          style={backgroundStyle}
        />
        <Animated.View style={animStyle}>
          <RNGH.GestureHandlerRootView>
            <RNGH.GestureDetector gesture={pan}>
              <Sheet
                style={sheet?.container?.style}
                behavior={isIos() ? `padding` : undefined}
              >
                <TopNotchContainer
                  onTouchStart={() => (sheetScrollEnabled.value = true)}
                >
                  {sheet?.topNotch?.slot ?? (
                    <TopNotch style={sheet?.topNotch?.style} />
                  )}
                </TopNotchContainer>
                <ScrollView
                  onScroll={(e) =>
                    (sheetScrollEnabled.value =
                      e.nativeEvent.contentOffset.y == 0)
                  }
                  scrollEventThrottle={16}
                >
                  <Content style={sheet?.content?.style}>{children}</Content>
                </ScrollView>
                <Native.View style={sheet?.footer?.style}>
                  {footer?.(null)}
                </Native.View>
              </Sheet>
            </RNGH.GestureDetector>
          </RNGH.GestureHandlerRootView>
        </Animated.View>
      </Portal>
    </BottomSheetBase>
  )
}

const BottomSheetBase = themed<BaseProps>(Base, (p) => ({}))

const Background = themed<BaseProps & { onClick: any }>(Animated.View, (p) => ({
  position: `absolute`,
  left: 0,
  bottom: 0,
  width: `100%`,
  height: `100%`,
}))

const Sheet = themed<KeyboardAvoidingViewProps>(KeyboardAvoidingView, (p) => ({
  position: `absolute`,
  left: 0,
  bottom: 0,
  backgroundColor: p.theme.proto.colors.surface.default,
  width: `100%`,
  borderWidth: 2,
  borderColor: hexOpacity(p.theme.proto.colors.border.disabled, 0.8),
  borderBottomColor: `transparent`,
  borderRadius: p.theme.proto.borderRadius(12),
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  boxShadow: `0px 10px 20px rgba(0, 0, 0, 0.25)`,
  elevation: 20,
  maxHeight: Native.Dimensions.get(`window`).height * 0.8,
}))

const TopNotchContainer = themed<BaseProps>(Base, (p) => ({}))
const TopNotch = themed<BaseProps>(Base, (p) => ({
  width: 80,
  height: 6,
  borderRadius: 99,
  backgroundColor: p.theme.proto.colors.surface.disabled,
  marginTop: p.theme.proto.spacing(3),
  marginBottom: p.theme.proto.spacing(3),
  marginLeft: `auto`,
  marginRight: `auto`,
}))

const Content = themed<Native.ScrollViewProps>(Native.ScrollView, (p) => ({
  padding: p.theme.proto.spacing(2),
  flex: 1,
}))
