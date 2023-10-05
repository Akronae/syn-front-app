import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react-native'

export type DropdownItemProps<T = any> = BaseProps & {
  value?: T
  interactive?: boolean
}

export function DropdownItem<T>(props: DropdownItemProps<T>) {
  const { ...passed } = props

  return <DropdownItemBase {...passed}></DropdownItemBase>
}
const DropdownItemBase = themed(Base, (p) => ({
  padding: 10,
  backgroundColor: p.theme.proto.colors.surface.sub,
  cursor: `pointer`,
}))
