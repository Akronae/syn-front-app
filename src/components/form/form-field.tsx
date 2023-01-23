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
import { FormFieldContext } from './form-field-context'
import { FormFieldHandle } from './form-field-handle'
import { FormFieldLabel } from './form-field-label'
import { FormFieldOnInvalid } from './form-field-on-invalid'
import useForm from './use-form'

export enum FormFieldState {
  Normal = `normal`,
  Error = `error`,
  Success = `success`,
}

export type FormFieldProps = ViewProps & {
  name: string
  validate?: (input: any) => boolean
  error?: { message?: string }
}

export const FormField = forwardRef<FormFieldHandle, FormFieldProps>(
  (props: FormFieldProps, ref) => {
    const { children, name, ...passed } = props

    const theme = useTheme()
    const form = useForm()
    const state = useExistingStateOr(
      form.elems[name]?.state,
      FormFieldState.Normal,
    )

    const refHandle = {
      state,
    }
    useImperativeHandle(ref, () => refHandle)
    form.elems[name] = refHandle

    const childrenGroupped = useGroupChildrenByType(children, {
      FormFieldOnInvalid: FormFieldOnInvalid,
      FormFieldLabel: FormFieldLabel,
    })

    return (
      <FormFieldBase gap={theme.spacing.two} {...passed}>
        {childrenGroupped.FormFieldLabel}
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
  Label: typeof FormFieldLabel
}
FormField.displayName = `FormField`
FormField.On = { Invalid: FormFieldOnInvalid }
FormField.Label = FormFieldLabel

const FormFieldBase = styled(View)`` as typeof View

const MessageError = styled(Text)`
  color: ${(p) => p.theme.colors.text.error};
`
