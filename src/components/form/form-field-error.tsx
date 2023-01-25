import styled from 'styled-components/native'
import { Text, TextProps } from 'src/components/text'

export type FormFieldErrorProps = TextProps

export const FormFieldError = styled(Text)`
  color: ${(p) => p.theme.colors.text.error};
`
