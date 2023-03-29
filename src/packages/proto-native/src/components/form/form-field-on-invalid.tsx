import { Base, BaseProps } from '@proto-native/components/base'
import * as React from 'react-native'
import { FormFieldState } from './form-field'
import useFormField from './use-form-field'

export type FormFieldOnInvalidProps = BaseProps

export function FormFieldOnInvalid(props: FormFieldOnInvalidProps) {
  const { ...passed } = props

  const formField = useFormField()
  if (formField?.state.state !== FormFieldState.Error) return null

  return <FormFieldOnInvalidBase {...passed}></FormFieldOnInvalidBase>
}

const FormFieldOnInvalidBase = Base
