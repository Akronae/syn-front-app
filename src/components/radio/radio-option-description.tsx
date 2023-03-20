import { BaseProps } from '@proto-native/components/base'
import { Text } from '@proto-native/components/text'
import { createThemedComponent } from '@proto-native/utils/theme/create-themed-component'
import * as React from 'react-native'

export type RadioOptionDescriptionProps = BaseProps

export function RadioOptionDescription(props: RadioOptionDescriptionProps) {
  const { ...passed } = props

  return <RadioOptionDescriptionBase {...passed}></RadioOptionDescriptionBase>
}

const RadioOptionDescriptionBase =
  createThemedComponent<RadioOptionDescriptionProps>(Text, (p) => ({
    fontSize: p.theme.protonative.typography.size.xs,
    color: p.theme.protonative.colors.text.sub,
    marginTop: 6,
  }))
