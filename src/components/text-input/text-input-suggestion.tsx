import { BaseProps } from '@proto-native'
import { Base } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'

export type TextInputSuggestionProps = BaseProps & {
  value: string
  isDisabled?: boolean
}

export function TextInputSuggestion(props: TextInputSuggestionProps) {
  const { children, ...passed } = props

  return (
    <TextInputSuggestionBase {...passed}>{children}</TextInputSuggestionBase>
  )
}
TextInputSuggestion.TypeName = `TextInputSuggestion`

const TextInputSuggestionBase = themed<TextInputSuggestionProps>(Base, (p) => ({
  padding: 10,
  cursor: `pointer`,
  borderTopLeftRadius: p.css?.selectors?.firstChild ? 10 : 0,
  borderTopRightRadius: p.css?.selectors?.firstChild ? 10 : 0,
  borderBottomRightRadius: p.css?.selectors?.lastChild ? 10 : 0,
  borderBottomLeftRadius: p.css?.selectors?.lastChild ? 10 : 0,
}))
