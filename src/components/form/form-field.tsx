import { View, ViewProps } from '@proto-native/components/view'
import { useExistingStateOr, useFlatStyle, useState } from '@proto-native/utils'
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useImperativeHandle,
  useMemo,
} from 'react'
import * as Native from 'react-native'
import { FormFieldContext } from './form-field-context'
import { FormFieldError } from './form-field-error'
import { FormFieldHandle } from './form-field-handle'
import { FormFieldLabel } from './form-field-label'
import { FormFieldOnInvalid } from './form-field-on-invalid'
import { FormFieldState } from './form-field-state'
import useForm from './use-form'

export type FormFieldProps = ViewProps & {
  name: string
  validate?: (input: any) => boolean
  error?: { message?: string; style?: Native.StyleProp<Native.TextStyle> }
}

export const FormField = forwardRef<FormFieldHandle, FormFieldProps>(
  (props: FormFieldProps, ref) => {
    const { children, name, error, gap, ...passed } = props

    const form = useForm()
    const state = useExistingStateOr(
      form?.fields[name]?.state,
      FormFieldState.Normal,
    )
    const defaultInput = useState<any>(null)

    const refHandle: FormFieldHandle = {
      state,
      input: defaultInput,
      props,
    }
    useImperativeHandle(ref, () => refHandle)
    if (form) form.fields[name] = refHandle

    const flattenStyle = useFlatStyle(props.style)
    const globalgap = gap ?? flattenStyle?.gap

    return (
      <FormFieldBase gap={globalgap} {...passed}>
        <FormFieldContext.Provider value={refHandle}>
          <View gap={globalgap}>{children}</View>
        </FormFieldContext.Provider>

        {state.state === FormFieldState.Error && error && (
          <FormField.Error style={error.style}>{error.message}</FormField.Error>
        )}
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

const FormFieldBase = View
