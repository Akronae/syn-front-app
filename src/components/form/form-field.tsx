import { Text } from '@proto-native/components/text'
import { View, ViewProps } from '@proto-native/components/view'
import { useExistingStateOr } from '@proto-native/utils'
import { forwardRef, useImperativeHandle } from 'react'
import * as React from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { FormFieldContext } from './form-field-context'
import useForm from './use-form'

export enum FormFieldState {
  Normal = `normal`,
  Error = `error`,
  Success = `success`,
}

export type FormFieldProps = ViewProps & {
  label: string
  input?: string
  validate?: (input: string) => boolean
  error?: { message?: string }
}

export const FormField = forwardRef((props: FormFieldProps, ref) => {
  const { children, label, ...passed } = props

  const theme = useTheme()
  const form = useForm()
  const state = useExistingStateOr(
    form.elems[label]?.state,
    FormFieldState.Normal,
  )

  const refHandle = {
    state,
  }
  useImperativeHandle(ref, () => refHandle)
  form.elems[label] = refHandle

  return (
    <FormFieldBase gap={theme.spacing.two} {...passed}>
      {label && <Label>{label}</Label>}
      <FormFieldContext.Provider value={refHandle}>
        {children}
      </FormFieldContext.Provider>
      {state.state === FormFieldState.Error && (
        <MessageError>{props.error?.message ?? `Invalid content`}</MessageError>
      )}
    </FormFieldBase>
  )
})
FormField.displayName = `FormField`

const FormFieldBase = styled(View)`` as typeof View

const Label = styled(Text)`
  font-size: ${(p) => p.theme.typography.size.xs}px;
  color: ${(p) => p.theme.colors.text.heavy};
` as typeof Text

const MessageError = styled(Text)`
  color: ${(p) => p.theme.colors.text.error};
`
