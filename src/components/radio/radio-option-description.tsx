import { BaseProps } from '@proto-native/components/base'
import { Text } from '@proto-native/components/text'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react-native'

export type RadioOptionDescriptionProps = BaseProps

export function RadioOptionDescription(props: RadioOptionDescriptionProps) {
  const { ...passed } = props

  return <RadioOptionDescriptionBase {...passed}></RadioOptionDescriptionBase>
}

const RadioOptionDescriptionBase = themed<RadioOptionDescriptionProps>(
  Text,
  (p) => ({
    fontSize: p.theme.proto.typography.size.xs,
    color: p.theme.proto.colors.text.sub,
    marginTop: 6,
  }),
)
