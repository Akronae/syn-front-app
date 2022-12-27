import { Base, BaseProps, Text } from '@proto-native'
import * as React from 'react-native'
import styled from 'styled-components/native'

export type TextInputSuggestionProps = BaseProps & {
  children: string
}

function TextInputSuggestionBase(props: TextInputSuggestionProps) {
  const { children, ...passed } = props

  return (
    <Base {...passed}>
      <Text>{children}</Text>
    </Base>
  )
}

export const TextInputSuggestion = styled(TextInputSuggestionBase)`
  background-color: ${(props) => props.theme.colors.surface.sub};
  padding: 10px;
  cursor: pointer;
` as typeof TextInputSuggestionBase
