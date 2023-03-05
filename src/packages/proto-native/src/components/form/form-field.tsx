import { View, ViewProps } from '@proto-native/components/view'
import { useExistingStateOr, useGroupChildrenByType } from '@proto-native/utils'
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useImperativeHandle,
} from 'react'
import * as React from 'react-native'
import styled from 'styled-components/native'
import { FormFieldContext } from './form-field-context'
import { FormFieldError } from './form-field-error'
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
  error?: { message?: string; style?: React.StyleProp<React.TextStyle> }
}

export const FormField = forwardRef<FormFieldHandle, FormFieldProps>(
  (props: FormFieldProps, ref) => {
    const { children, name, error, ...passed } = props

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
      FormFieldError: FormFieldError,
    })

    return (
      <FormFieldBase
        gap={{ vertical: (t) => t.protonative.spacing(2) }}
        {...passed}
      >
        {childrenGroupped.FormFieldLabel}
        <FormFieldContext.Provider value={refHandle}>
          {childrenGroupped.others}
        </FormFieldContext.Provider>

        {state.state === FormFieldState.Error &&
          childrenGroupped.FormFieldError}
        {state.state === FormFieldState.Error && error && (
          <FormField.Error style={error.style}>{error.message}</FormField.Error>
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
  Error: typeof FormFieldError
}
FormField.displayName = `FormField`
FormField.On = { Invalid: FormFieldOnInvalid }
FormField.Label = FormFieldLabel
FormField.Error = FormFieldError

const FormFieldBase = styled(View)`` as typeof View
