import { Portal } from '@gorhom/portal'
import { Base, BaseProps } from '@proto-native/components/base'
import {
  hexOpacity,
  ReactiveState,
  useExistingStateOr,
  useFlatStyle,
} from '@proto-native/utils'
import { themed } from '@proto-native/utils/theme/themed'
import * as Native from 'react-native'
import * as React from 'react'
import * as RNGH from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

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
  }
}

export function BottomSheet(props: BottomSheetProps) {
  const { children, open: openProps, sheet, overlay, ...passed } = props
  const contianerFlatStyle = useFlatStyle(sheet?.container?.style)
  const open = useExistingStateOr(openProps, true)

  const close = () => {
    open.state = false
  }

  const y = useSharedValue(0)
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: Math.max(y.value, 0) }],
    height: contianerFlatStyle.height ?? `100%`,
  }))

  const pan = RNGH.Gesture.Pan()
    .onChange((e) => {
      y.value = e.translationY
    })
    .onEnd((e) => {
      y.value = 0

      if (e.velocityY > 1000 || e.absoluteY < 100) {
        close()
      }
    })

  const SheetWrapper = RNGH.gestureHandlerRootHOC(() => (
    <RNGH.GestureDetector gesture={pan}>
      <TopNotchContainer>
        {sheet?.topNotch?.slot ?? <TopNotch style={sheet?.topNotch?.style} />}
      </TopNotchContainer>
    </RNGH.GestureDetector>
  ))

  return (
    <BottomSheetBase showIf={open.state} {...passed}>
      <Portal hostName='bottom-sheet'>
        <Background onTouchEnd={close} style={overlay?.style} />
        <Animated.View style={[animStyle]}>
          <Sheet style={{ height: `100%` }}>
            <Base>
              <SheetWrapper />
            </Base>

            <Content style={sheet?.content?.style}>{children}</Content>
          </Sheet>
        </Animated.View>
      </Portal>
    </BottomSheetBase>
  )
}

const BottomSheetBase = Base

const Background = themed<BaseProps>(Base, (p) => ({
  position: `absolute`,
  left: 0,
  bottom: 0,
  width: `100%`,
  height: `100%`,
  backgroundColor: hexOpacity(p.theme.protonative.colors.surface.default, 0.1),
}))

const Sheet = themed<BaseProps>(Base, (p) => ({
  position: `absolute`,
  left: 0,
  bottom: 0,
  backgroundColor: p.theme.protonative.colors.surface.default,
  width: `100%`,
  borderWidth: 2,
  borderColor: hexOpacity(p.theme.protonative.colors.border.disabled, 0.8),
  borderBottomColor: `transparent`,
  borderRadius: p.theme.protonative.borderRadius(12),
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  minHeight: 200,
  shadowColor: `#000`,
  shadowOffset: {
    width: 0,
    height: -10,
  },
  shadowOpacity: 1,
  shadowRadius: 100,
  elevation: 20,
}))

const TopNotchContainer = themed<BaseProps>(Base, (p) => ({}))
const TopNotch = themed<BaseProps>(Base, (p) => ({
  width: 50,
  height: 6,
  borderRadius: 99,
  backgroundColor: p.theme.protonative.colors.surface.disabled,
  marginTop: p.theme.protonative.spacing(3),
  marginLeft: `auto`,
  marginRight: `auto`,
  marginBottom: 0,
}))

const Content = themed<BaseProps>(Base, (p) => ({
  padding: p.theme.protonative.spacing(6),
}))
