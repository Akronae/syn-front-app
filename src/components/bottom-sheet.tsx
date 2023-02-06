import { Base, BaseProps } from '@proto-native/components/base'
import { hexLerp, ReactiveState, useExistingStateOr } from '@proto-native/utils'
import * as React from 'react-native'
import styled from 'styled-components/native'
import { Portal } from '@gorhom/portal'

export type BottomSheetProps = BaseProps & {
  open?: ReactiveState<boolean>
}

export function BottomSheet(props: BottomSheetProps) {
  const { children, open: openProps, ...passed } = props
  const _open = useExistingStateOr(openProps, false)

  return (
    <BottomSheetBase {...passed}>
      <Portal hostName='bottom-sheet'>
        <Sheet>
          <TopNotch />
          <Content>{children}</Content>
        </Sheet>
      </Portal>
    </BottomSheetBase>
  )
}

const BottomSheetBase = styled(Base)`` as typeof Base

const Sheet = styled(Base)`
  background-color: ${(p) => p.theme.colors.surface.default};
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border: 2px solid
    ${(p) => hexLerp(p.theme.colors.border.default, `#00000000`, 0.5)};
  border-radius: ${(p) => p.theme.borderRadius(10)}px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  min-height: 200px;
  z-index: 10;
` as typeof Base

const TopNotch = styled(Base)`
  width: 50px;
  height: 5px;
  border-radius: 99px;
  background-color: ${(p) => p.theme.colors.surface.disabled};
  margin: ${(p) => p.theme.spacing(2)}px auto 0 auto;
`

const Content = styled(Base)`
  padding: ${(p) => p.theme.spacing(6)}px;
`
