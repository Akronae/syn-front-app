import { BaseProps } from '@proto-native'
import { Base } from '@proto-native/components/base'
import { createThemedComponent } from '@proto-native/utils/theme/create-themed-component'

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

const TextInputSuggestionBase = createThemedComponent<TextInputSuggestionProps>(
  Base,
  (p) => ({
    padding: 10,
    cursor: `pointer`,
    borderTopLeftRadius: p.css?.selectors?.firstChild ? 10 : 0,
    borderTopRightRadius: p.css?.selectors?.firstChild ? 10 : 0,
    borderBottomRightRadius: p.css?.selectors?.lastChild ? 10 : 0,
    borderBottomLeftRadius: p.css?.selectors?.lastChild ? 10 : 0,
  }),
)
