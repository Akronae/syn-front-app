import { Text, TextProps } from '@proto-native/components/text'
import styled from 'styled-components/native'

export type FormFieldErrorProps = TextProps

export const FormFieldError = styled(Text)`
  color: ${(p) => p.theme.protonative.colors.text.error};
`
