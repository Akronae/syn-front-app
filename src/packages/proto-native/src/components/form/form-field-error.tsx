import { Text, TextProps } from '@proto-native/components/text'
import { themed } from '@proto-native/utils/theme/themed'

export type FormFieldErrorProps = TextProps

export const FormFieldError = themed(Text, (p) => ({
  color: p.theme.protonative.colors.text.error,
}))
