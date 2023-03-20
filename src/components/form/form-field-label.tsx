import { Text, TextProps } from '@proto-native/components/text'
import { createThemedComponent } from '@proto-native/utils/theme/create-themed-component'

export type FormFieldLabelProps = TextProps

export const FormFieldLabel = createThemedComponent(Text, (p) => ({
  fontSize: p.theme.protonative.typography.size.xs,
  color: p.theme.protonative.colors.text.heavy,
}))
