import { Portal } from '@gorhom/portal'
import { Base, BaseProps } from '@proto-native/components/base'
import {
  createThemedStyle,
  ReactiveState,
  useExistingStateOr,
} from '@proto-native/utils'
import { themed } from '@proto-native/utils/theme/themed'
import * as Native from 'react-native'
import { StyleSheet } from 'react-native'
import { useTheme } from 'styled-components/native'

export type ModalProps = BaseProps & {
  portalName?: string
  open?: ReactiveState<boolean>
  overlay?: {
    style?: Native.ViewStyle
    onPress?: (e: Native.GestureResponderEvent) => void
    dismissOnPress?: boolean
  }
  wrapper?: React.ComponentType<BaseProps>
}

export function Modal(props: ModalProps) {
  const {
    children,
    overlay,
    open: openProps,
    portalName = `modal`,
    wrapper: Wrapper = Base,
    ...passed
  } = props
  const open = useExistingStateOr(openProps, true)
  const theme = useTheme()

  const onBackgroundPress = (e: Native.GestureResponderEvent) => {
    setTimeout(() => {
      if (overlay?.dismissOnPress) open.state = false
      overlay?.onPress?.(e)
    }, 1)
  }

  return (
    <ModalBase showIf={open.state}>
      <Portal hostName={portalName}>
        <Wrapper
          {...passed}
          style={StyleSheet.flatten([wrapperStyle(theme), passed.style])}
        >
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

const wrapperStyle = createThemedStyle<BaseProps>((p) => ({
  position: `absolute`,
  top: 0,
  left: 0,
  width: `100%`,
  height: `100%`,
}))

const Content = themed(Base, (p) => ({}))
