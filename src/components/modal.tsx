import { Portal } from '@gorhom/portal'
import { Base, BaseProps } from '@proto-native/components/base'
import { ReactiveState, useExistingStateOr } from '@proto-native/utils'
import { themed } from '@proto-native/utils/theme/themed'
import * as Native from 'react-native'

export type ModalProps = BaseProps & {
  portalName?: string
  open?: ReactiveState<boolean>
  overlay?: {
    style?: Native.ViewStyle
    onPress?: (e: Native.GestureResponderEvent) => void
    dismissOnPress?: boolean
  }
}

export function Modal(props: ModalProps) {
  const {
    children,
    overlay,
    open: openProps,
    portalName = `modal`,
    ...passed
  } = props
  const open = useExistingStateOr(openProps, true)

  const onBackgroundPress = (e: Native.GestureResponderEvent) => {
    setTimeout(() => {
      if (overlay?.dismissOnPress) open.state = false
      overlay?.onPress?.(e)
    }, 1)
  }

  return (
    <ModalBase showIf={open.state}>
      <Portal hostName={portalName}>
        <Wrapper {...passed}>
          <Overlay onPress={onBackgroundPress} style={overlay?.style} />
          <Content>{children}</Content>
        </Wrapper>
      </Portal>
    </ModalBase>
  )
}

const ModalBase = Base

const Overlay = themed<BaseProps>(Base, (p) => ({
  position: `absolute`,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: `100%`,
  height: `100%`,
  backgroundColor: `transparent`,
}))

const Wrapper = themed<BaseProps>(Base, (p) => ({
  position: `absolute`,
}))

const Content = themed(Base, (p) => ({
  left: 0,
  top: 0,
}))
