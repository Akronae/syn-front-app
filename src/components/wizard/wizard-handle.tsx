import { ReactiveState } from '@proto-native/utils'

export type WizardHandle<T = any> = {
  step: {
    current: ReactiveState<number>
    count: number
  }
  data?: ReactiveState<T>
  back: () => boolean
  next: () => boolean
  go: (to: number) => boolean
  guards: { back?: () => boolean; next?: () => boolean }
  canGo: {
    next: () => boolean
    back: () => boolean
  }
}
