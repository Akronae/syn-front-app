import { ReactiveState } from '@proto-native/utils'
import { FormFieldProps } from './form-field'
import { FormFieldState } from './form-field-state'

export type FormFieldHandle = {
  state: ReactiveState<FormFieldState>
  input?: ReactiveState<any>
  props?: FormFieldProps
}
