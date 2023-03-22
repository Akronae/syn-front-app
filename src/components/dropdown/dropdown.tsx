import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as Native from 'react-native'
import * as React from 'react'
import styled from 'styled-components/native'
import { DropdownItemProps } from './dropdown-item'
import { useChildrenByType, useGroupChildrenByType } from '@proto-native/utils'

export type DropdownProps = BaseProps & {
  onItemPress?: (item: React.ReactElement<DropdownItemProps>) => void
}

export function Dropdown(props: DropdownProps) {
  const { children, ...passed } = props
  const childrenBy = useGroupChildrenByType(children, {DropdownItem: Dropdown.Item})

  return <DropdownBase {...passed}>
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
}
Dropdown.Item = themed(Base, _p => ({}))

const DropdownBase = themed(Base, _p => ({}))
