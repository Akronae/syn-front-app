import { BaseProps, Text } from '@proto-native'
import { Base } from '@proto-native/components/base'
import * as React from 'react-native'
import styled from 'styled-components/native'

export type TextInputSuggestionProps = BaseProps & {
  children: string
}

export function TextInputSuggestion(props: TextInputSuggestionProps) {
  const { children, ...passed } = props

  return (
    <TextInputSuggestionBase {...passed}>
      <Text>{children}</Text>
    </TextInputSuggestionBase>
  )
} 

const TextInputSuggestionBase = styled(Base)`
  background-color: ${(props) => props.theme.colors.surface.sub};
  padding: 10px;
  cursor: pointer;
`
