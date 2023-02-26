import { FormFieldState } from './form-field'
import { ReactiveState } from '@proto-native/utils'

export type FormFieldHandle = {
  state: ReactiveState<FormFieldState>
  input?: ReactiveState<any>
}
