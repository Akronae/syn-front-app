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
import { Modal, ModalProps } from './modal'
import { useInterval, useState } from '@proto-native/utils'
import { useTimeout } from '@proto-native/utils/use-timeout'

export type AnchoredModalProps = ModalProps

export const AnchoredModal = React.forwardRef<
  typeof AnchoredModalBase,
  AnchoredModalProps
>((props: AnchoredModalProps, ref) => {
  const { children, style, ...passed } = props
  const anchor = useState({ x: 0, y: 0, width: 0, height: 0 })
  const anchorRef = React.useRef<Native.View>(null)

  return (
    <AnchoredModalBase>
      {/* Empty view that gives us the position of the parent element */}
      <Native.View
        ref={anchorRef}
        onLayout={(e) => {
          anchorRef.current?.measureInWindow((x, y, width, height) => {
            anchor.state = { x, y, width, height }
          })
        }}
      />

      <Modal
        style={Native.StyleSheet.flatten([
          {
            position: 'absolute',
            left: anchor.state.x,
            top: anchor.state.y,
            width: anchor.state.width,
            height: anchor.state.height,
          },
          style,
        ])}
        {...passed}
      >
        {children}
      </Modal>
    </AnchoredModalBase>
  )
})
AnchoredModal.displayName = `AnchoredModal`

const AnchoredModalBase = themed(Base, (_p) => ({}))
