import { FormField } from '@proto-native/components/form/form-field'
import { View, ViewProps } from '@proto-native/components/view'
import { useGroupChildrenByType } from '@proto-native/utils'
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useImperativeHandle,
} from 'react'
import styled from 'styled-components/native'
import { FormContext } from './form-context'
import { FormHandle } from './form-handle'
import { useFormValidate } from './form-use-form-validate'

export type FormProps = ViewProps
export type FormRef = { validate: () => boolean }

export const Form = forwardRef<FormRef, FormProps>((props: FormProps, ref) => {
  const { children, ...passed } = props

  const validate = useFormValidate()
  const childrenByType = useGroupChildrenByType(children, {
    FormField: FormField,
  })

  const fields = childrenByType.FormField
  const elems: FormHandle[`elems`] = {}

  useImperativeHandle(ref, () => ({
    validate: () => validate(fields, elems),
  }))

  return (
    <FormContext.Provider value={{ elems }}>
      <FormBase {...passed}>{children}</FormBase>
    </FormContext.Provider>
  )
}) as ForwardRefExoticComponent<FormProps & RefAttributes<FormRef>> & {
  Field: typeof FormField
}
Form.displayName = `Form`
Form.Field = FormField

const FormBase = styled(View)`` as typeof View
