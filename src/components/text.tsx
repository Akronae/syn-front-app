import * as Proto from '@proto-native'
import * as React from 'react-native'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'

export type TextProps = Proto.TextProps

export function Text(props: TextProps) {
  const { ...passed } = props

  return <TextBase {...passed}></TextBase>
}

const TextBase = themed(Proto.Text, (p) => ({}))
