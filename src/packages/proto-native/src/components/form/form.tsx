import { FormField } from '@proto-native/components/form/form-field'
import { View, ViewProps } from '@proto-native/components/view'
import { useForceUpdate } from '@proto-native/utils'
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useImperativeHandle,
} from 'react'
import { FormContext } from './form-context'
import { FormHandle } from './form-handle'
import { useFormValidate } from './form-use-form-validate'

export type FormProps = ViewProps
export type FormRef = {
  validate: () => Promise<boolean>
  fields: FormHandle[`fields`]
}

export const Form = forwardRef<FormRef, FormProps>((props: FormProps, ref) => {
  const { children, ...passed } = props

  const validate = useFormValidate()
  const forceUpdate = useForceUpdate()
  const rerender = () => {
    forceUpdate()
    setImmediate(forceUpdate)
  }

  const fields: FormHandle[`fields`] = {}

  const formHandle: FormHandle = { fields, rerender }

  useImperativeHandle(ref, () => ({
    validate: () => validate(formHandle),
    fields,
  }))

  return (
    <FormContext.Provider value={formHandle}>
      <FormBase {...passed}>{children}</FormBase>
    </FormContext.Provider>
  )
}) as ForwardRefExoticComponent<FormProps & RefAttributes<FormRef>> & {
  Field: typeof FormField
}
Form.displayName = `Form`
Form.Field = FormField

const FormBase = View
