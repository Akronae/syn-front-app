import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'
import { DropdownItem, DropdownItemProps } from './dropdown-item'
import { useGroupChildrenByType } from '@proto-native/utils'

export type DropdownProps = BaseProps & {
  onItemPress?: (item: React.ReactElement<DropdownItemProps>) => void
}

export function Dropdown(props: DropdownProps) {
  const { children, ...passed } = props
  const childrenBy = useGroupChildrenByType(children, {
    DropdownItem: Dropdown.Item,
  })

  if (!childrenBy.DropdownItem.length) return null

  return (
    <DropdownBase {...passed}>
      {childrenBy.DropdownItem.map((child, index) => {
        return React.cloneElement(child, {
          key: index,
          onPress: () => {
            child.props.onPress?.()
            props.onItemPress?.(child)
          },
        })
      })}
    </DropdownBase>
  )
}
Dropdown.Item = DropdownItem

const DropdownBase = themed<DropdownProps>(Base, (p) => ({}))
