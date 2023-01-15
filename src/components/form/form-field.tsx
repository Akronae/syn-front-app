import { FormFieldContext } from './form-field-context'
import { FormFieldHandle } from './form-field-handle'
import { FormFieldOnInvalid } from './form-field-on-invalid'
import useForm from './use-form'
import { Text } from '@proto-native/components/text'
import { View, ViewProps } from '@proto-native/components/view'
import { useExistingStateOr, useGroupChildrenByType } from '@proto-native/utils'
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useImperativeHandle,
} from 'react'
import * as React from 'react-native'
import styled, { useTheme } from 'styled-components/native'

export enum FormFieldState {
  Normal = `normal`,
  Error = `error`,
  Success = `success`,
}

export type FormFieldProps = ViewProps & {
  label: string
  validate?: (input: any) => boolean
  error?: { message?: string }
}

export const FormField = forwardRef<FormFieldHandle, FormFieldProps>(
  (props: FormFieldProps, ref) => {
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

    const childrenGroupped = useGroupChildrenByType(children, {
      FormFieldOnInvalid: FormFieldOnInvalid,
    })

    return (
      <FormFieldBase gap={theme.spacing.two} {...passed}>
        {label && <Label>{label}</Label>}
        <FormFieldContext.Provider value={refHandle}>
          {childrenGroupped.others}
        </FormFieldContext.Provider>
        {state.state === FormFieldState.Error && (
          <MessageError>
            {props.error?.message ?? `Invalid content`}
          </MessageError>
        )}
        {state.state === FormFieldState.Error &&
          childrenGroupped.FormFieldOnInvalid}
      </FormFieldBase>
    )
  },
) as ForwardRefExoticComponent<
  FormFieldProps & RefAttributes<FormFieldHandle>
> & {
  On: { Invalid: typeof FormFieldOnInvalid }
}
FormField.displayName = `FormField`
FormField.On = { Invalid: FormFieldOnInvalid }

const FormFieldBase = styled(View)`` as typeof View

const Label = styled(Text)`
  font-size: ${(p) => p.theme.typography.size.xs}px;
  color: ${(p) => p.theme.colors.text.heavy};
` as typeof Text

const MessageError = styled(Text)`
  color: ${(p) => p.theme.colors.text.error};
`
