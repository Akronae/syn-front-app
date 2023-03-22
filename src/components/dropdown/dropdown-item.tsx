import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react-native'

export type DropdownItemProps<T = any> = BaseProps & {
  value: T
}

export function DropdownItem<T>(props: DropdownItemProps<T>) {
  const { ...passed } = props

  return <DropdownItemBase {...passed}></DropdownItemBase>
}
const DropdownItemBase = themed(Base, _p => ({}))
