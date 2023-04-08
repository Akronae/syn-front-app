import { Portal } from '@gorhom/portal'
import { Base, BaseProps } from '@proto-native/components/base'
import { ReactiveState, useExistingStateOr } from '@proto-native/utils'
import { themed } from '@proto-native/utils/theme/themed'
import * as Native from 'react-native'

export type ModalProps = BaseProps & {
  open?: ReactiveState<boolean>
  overlay?: {
    style?: Native.StyleProp<Native.ViewStyle>
    onPress?: (e: Native.GestureResponderEvent) => void
  }
}

export function Modal(props: ModalProps) {
  const { children, overlay, open: openProps, ...passed } = props
  const open = useExistingStateOr(openProps, true)

  const onBackgroundPress = (e: Native.GestureResponderEvent) => {
    setTimeout(() => {
      open.state = false
      overlay?.onPress?.(e)
    }, 1)
  }

  return (
    <ModalBase showIf={open.state} {...passed}>
      <Portal hostName='modal'>
        <Overlay onPress={onBackgroundPress} style={overlay?.style} />
        <Content>{children}</Content>
      </Portal>
    </ModalBase>
  )
}

const ModalBase = Base

const Overlay = themed<BaseProps & { transparent?: boolean }>(Base, (p) => ({
  position: `absolute`,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: `100%`,
  height: `100%`,
  backgroundColor: `transparent`,
}))

const Content = themed(Base, (p) => ({
  position: `absolute`,
  left: 0,
  top: 0,
  width: `100%`,
}))
