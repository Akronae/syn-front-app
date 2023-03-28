import { Text, TextProps } from '@proto-native/components/text'
import { themed } from '@proto-native/utils/theme/themed'
import { FormFieldState } from './form-field'
import useFormField from './use-form-field'

export type FormFieldErrorProps = TextProps

export function FormFieldError(props: FormFieldErrorProps) {
  const { ...passed } = props

  const formField = useFormField()
  if (formField?.state.state !== FormFieldState.Error) return null

  return <FormFieldErrorBase {...passed}></FormFieldErrorBase>
}

const FormFieldErrorBase = themed(Text, (p) => ({
  color: p.theme.protonative.colors.text.error,
}))
