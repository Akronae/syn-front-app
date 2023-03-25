import { DispatchWithoutAction } from 'react'
import { FormFieldHandle } from './form-field-handle'

export type FormHandle = {
  fields: Record<string, FormFieldHandle>
  rerender: DispatchWithoutAction
}
