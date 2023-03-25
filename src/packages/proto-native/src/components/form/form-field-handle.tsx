import { ReactiveState } from '@proto-native/utils'
import { FormFieldState } from './form-field'

export type FormFieldHandle = {
  state: ReactiveState<FormFieldState>
  input?: ReactiveState<any>
}
