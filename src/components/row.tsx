import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'
import { FlexStyle } from 'react-native'

export type RowProps = BaseProps & {
  justifyContent?: FlexStyle['justifyContent']
  alignItems?: FlexStyle['alignItems']
  flexWrap?: FlexStyle['flexWrap']
  gap?: number
}

export function Row(props: RowProps) {
  const { ...passed } = props

  return <RowBase {...passed}></RowBase>
}

const RowBase = themed<RowProps>(Base, (p) => ({
  display: `flex`,
  flexDirection: `row`,
  justifyContent: p.justifyContent,
  alignItems: p.alignItems,
  flexWrap: p.flexWrap,
  gap: p.gap,
}))
