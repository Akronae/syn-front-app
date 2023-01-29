import { ReactiveState } from '@proto-native/utils'

export type WizardHandle<T = any> = {
  step: ReactiveState<number>
  data?: ReactiveState<T>
  back: () => void
  next: () => void
  guards: { back?: () => boolean; next?: () => boolean }
}
