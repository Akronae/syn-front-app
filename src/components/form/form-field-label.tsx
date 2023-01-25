import { Text, TextProps } from 'src/components/text'
import styled from 'styled-components/native'

export type FormFieldLabelProps = TextProps

export const FormFieldLabel = styled(Text)`
  font-size: ${(p) => p.theme.typography.size.xs}px;
  color: ${(p) => p.theme.colors.text.heavy};
` as typeof Text
