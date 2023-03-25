import { BaseProps } from '@proto-native'
import { Base } from '@proto-native/components/base'
import styled from 'styled-components/native'

export type TextInputSuggestionProps = BaseProps & {
  value: string
  isDisabled?: boolean
}

export function TextInputSuggestion(
  this: any,
  props: TextInputSuggestionProps,
) {
  const { children, ...passed } = props

  return (
    <TextInputSuggestionBase {...passed}>{children}</TextInputSuggestionBase>
  )
}
TextInputSuggestion.TypeName = `TextInputSuggestion`

const TextInputSuggestionBase = styled(Base)<TextInputSuggestionProps>`
  padding: 10px;
  cursor: pointer;
  border-top-left-radius: ${(props) =>
  props.css?.selectors?.firstChild ? 10 : 0}px;
  border-top-right-radius: ${(props) =>
    props.css?.selectors?.firstChild ? 10 : 0}px;
  border-bottom-right-radius: ${(props) =>
      props.css?.selectors?.lastChild ? 10 : 0}px;
  border-bottom-left-radius: ${(props) =>
        props.css?.selectors?.lastChild ? 10 : 0}px;
` as typeof Base
