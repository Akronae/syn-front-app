import { Base } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'
import * as Native from 'react-native'

import { Modal, ModalProps } from './modal'
import { useState } from '@proto-native/utils'

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
            position: `absolute`,
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
