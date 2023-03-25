import { FormFieldHandle } from './form-field-handle'

export type FormHandle = {
  elems: Record<string, FormFieldHandle>
}
