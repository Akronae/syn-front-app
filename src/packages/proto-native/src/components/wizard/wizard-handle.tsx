import { ReactiveState } from '@proto-native/utils'

export type WizardHandle<T = any> = {
  step: ReactiveState<number>
  data?: ReactiveState<T>
  back: () => void
  next: () => void
  go: (to: number) => void
  guards: { back?: () => boolean; next?: () => boolean }
}
