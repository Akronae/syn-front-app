import { Text, TextProps } from '@proto-native/components/text'
import { createThemedComponent } from '@proto-native/utils/theme/create-themed-component'

export type FormFieldErrorProps = TextProps

export const FormFieldError = createThemedComponent(Text, (p) => ({
  color: p.theme.protonative.colors.text.error,
}))
