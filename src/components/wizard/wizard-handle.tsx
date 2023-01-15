import { ReactiveState } from '@proto-native/utils'

export type WizardHandle<T = any> = {
  step: ReactiveState<number>
  data?: ReactiveState<T>
  next: () => void
}
