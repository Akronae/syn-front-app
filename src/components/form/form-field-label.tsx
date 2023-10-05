import { Text, TextProps } from '@proto-native/components/text'
import { themed } from '@proto-native/utils/theme/themed'

export type FormFieldLabelProps = TextProps

export const FormFieldLabel = themed(Text, (p) => ({
  fontSize: p.theme.proto.typography.size.xs,
  color: p.theme.proto.colors.text.heavy,
}))
