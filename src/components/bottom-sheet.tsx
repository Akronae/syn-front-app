import { Base, BaseProps } from '@proto-native/components/base'
import { ReactiveState, useExistingStateOr } from '@proto-native/utils'
import * as React from 'react-native'
import styled from 'styled-components/native'

export type BottomSheetProps = BaseProps & {
  open?: ReactiveState<boolean>
}

export function BottomSheet(props: BottomSheetProps) {
  const { open: openProps, ...passed } = props
  const _open = useExistingStateOr(openProps, false)

  return <BottomSheetBase {...passed}></BottomSheetBase>
}

const BottomSheetBase = styled(Base)`
  background-color: ${p => p.theme.colors.surface.default};
  padding: ${p => p.theme.spacing.four}px;
` as typeof Base
