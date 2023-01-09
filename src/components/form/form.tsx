import {
  FormField,
  FormFieldState,
} from '@proto-native/components/form/form-field'
import { View, ViewProps } from '@proto-native/components/view'
import { useChildrenByType } from '@proto-native/utils'
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useImperativeHandle,
} from 'react'
import styled from 'styled-components/native'
import { FormContext } from './form-context'
import { FormHandle } from './form-handle'

export type FormProps = ViewProps
export type FormRef = { validate: () => boolean }

export const Form = forwardRef<FormRef, FormProps>((props: FormProps, ref) => {
  const { children, ...passed } = props

  const { taken: fields } = useChildrenByType(children, FormField)

  const elems: FormHandle['elems'] = {}

  useImperativeHandle(ref, () => ({
    validate: () => {
      let isFormValid = true
      fields.forEach((field) => {
        if (field.props.validate) {
          const elemHandle = elems[field.props.label]
          const valid = field.props.validate(elemHandle?.input?.state ?? ``)
          if (!valid) {
            isFormValid = false
            if (elemHandle) elemHandle.state.state = FormFieldState.Error
          }
        }
      })
      return isFormValid
    },
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
