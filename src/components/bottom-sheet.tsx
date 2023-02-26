import { Base, BaseProps } from '@proto-native/components/base'
import {
  hexOpacity,
  ReactiveState,
  useExistingStateOr,
} from '@proto-native/utils'
import * as React from 'react-native'
import styled from 'styled-components/native'
import { Portal } from '@gorhom/portal'

export type BottomSheetProps = BaseProps & {
  open?: ReactiveState<boolean>
}

export function BottomSheet(props: BottomSheetProps) {
  const { children, open: openProps, ...passed } = props
  const open = useExistingStateOr(openProps, false)

  const close = () => {
    setImmediate(() => {
      open.state = false
    })
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

const BottomSheetBase = styled(Base)`` as typeof Base

const Background = styled(Base)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  cursor: pointer;
`

const Sheet = styled(Base)`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: ${(p) => p.theme.protonative.colors.surface.default};
  width: 100%;
  border: 2px solid
    ${(p) => hexOpacity(p.theme.protonative.colors.border.disabled, 0.8)};
  border-bottom-color: transparent;
  border-radius: ${(p) => p.theme.protonative.borderRadius(12)}px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  min-height: 200px;
  z-index: 10;
` as typeof Base

const TopNotch = styled(Base)`
  width: 50px;
  height: 6px;
  border-radius: 99px;
  background-color: ${(p) => p.theme.protonative.colors.surface.disabled};
  margin: ${(p) => p.theme.protonative.spacing(3)}px auto 0 auto;
`

const Content = styled(Base)`
  padding: ${(p) => p.theme.protonative.spacing(6)}px;
`
