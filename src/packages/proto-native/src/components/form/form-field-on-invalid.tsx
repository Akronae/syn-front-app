import { Base, BaseProps } from '@proto-native/components/base'
import * as React from 'react-native'

export type FormFieldOnInvalidProps = BaseProps

export function FormFieldOnInvalid(props: FormFieldOnInvalidProps) {
  const { ...passed } = props

  return <FormFieldOnInvalidBase {...passed}></FormFieldOnInvalidBase>
}

const FormFieldOnInvalidBase = Base
