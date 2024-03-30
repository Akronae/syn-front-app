import { Base, BaseProps } from '@proto-native'
import * as React from 'react-native'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'
import { Text, TextProps } from './text'

export type GreekProps = TextProps

export function Greek(props: GreekProps) {
  const { ...passed } = props

  return <GreekBase {...passed}></GreekBase>
}

const GreekBase = themed(Text, (p) => ({
  fontFamily: p.theme.syn.typography.font.greekRegular,
}))
