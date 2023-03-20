import { Portal } from '@gorhom/portal'
import { Base, BaseProps } from '@proto-native/components/base'
import {
  hexOpacity,
  ReactiveState,
  useExistingStateOr,
} from '@proto-native/utils'
import { createThemedComponent } from '@proto-native/utils/theme/create-themed-component'
import * as React from 'react-native'

export type BottomSheetProps = BaseProps & {
  open?: ReactiveState<boolean>
}

export function BottomSheet(props: BottomSheetProps) {
  const { children, open: openProps, ...passed } = props
  const open = useExistingStateOr(openProps, false)

  const close = () => {
    setTimeout(() => {
      open.state = false
    }, 1)
  }

  return (
    <BottomSheetBase showIf={open.state} {...passed}>
      <Portal hostName='bottom-sheet'>
        <Background onTouchEnd={close} />

        <Sheet>
          <TopNotch />
          <Content>{children}</Content>
        </Sheet>
      </Portal>
    </BottomSheetBase>
  )
}

const BottomSheetBase = Base

const Background = createThemedComponent(Base, (p) => ({
  position: `absolute`,
  left: 0,
  bottom: 0,
  width: `100%`,
  height: `100%`,
  backgroundColor: hexOpacity(p.theme.protonative.colors.surface.default, 0.8),
}))

const Sheet = createThemedComponent(Base, (p) => ({
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
  zIndex: 10,
}))

const TopNotch = createThemedComponent(Base, (p) => ({
  width: 50,
  height: 6,
  borderRadius: 99,
  backgroundColor: p.theme.protonative.colors.surface.disabled,
  marginTop: p.theme.protonative.spacing(3),
  marginLeft: `auto`,
  marginRight: `auto`,
  marginBottom: 0,
}))

const Content = createThemedComponent(Base, (p) => ({
  padding: p.theme.protonative.spacing(6),
}))
