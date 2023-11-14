import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'
import { FlexStyle } from 'react-native'

export type ColumnProps = BaseProps & {
  justifyContent?: FlexStyle['justifyContent']
  alignItems?: FlexStyle['alignItems']
  flex?: FlexStyle['flex']
  gap?: number
}

export function Column(props: ColumnProps) {
  const { ...passed } = props

  return <ColumnBase {...passed}></ColumnBase>
}

const ColumnBase = themed<ColumnProps>(Base, (p) => ({
  display: `flex`,
  flexDirection: `column`,
  flex: p.flex,
  justifyContent: p.justifyContent,
  alignItems: p.alignItems,
  gap: p.gap,
}))
