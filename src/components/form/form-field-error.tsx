import { Text, TextProps } from '@proto-native/components/text'
import { themed } from '@proto-native/utils/theme/themed'

export type FormFieldErrorProps = TextProps

export function FormFieldError(props: FormFieldErrorProps) {
  const { ...passed } = props

  return <FormFieldErrorBase {...passed}></FormFieldErrorBase>
}

const FormFieldErrorBase = themed(Text, (p) => ({
  color: p.theme.proto.colors.text.error,
  fontSize: p.theme.proto.typography.size.sm,
}))
