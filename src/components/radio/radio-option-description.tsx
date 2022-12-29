import { BaseProps } from '@proto-native/components/base'
import { Text } from '@proto-native/components/text'
import * as React from 'react-native'
import styled from 'styled-components/native'

export type RadioOptionDescriptionProps = BaseProps

export function RadioOptionDescription(props: RadioOptionDescriptionProps) {
  const { ...passed } = props

  return <RadioOptionDescriptionBase {...passed}></RadioOptionDescriptionBase>
}

const RadioOptionDescriptionBase = styled(Text)<RadioOptionDescriptionProps>`
  font-size: ${(p) => p.theme.typography.size.xs};
  color: ${(p) => p.theme.colors.text.sub};
  margin-top: 6px;
` as typeof Text
