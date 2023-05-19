import { ReactiveState } from '@proto-native/utils'

export type WizardEventData<T> = { wizard: WizardHandle; data: T }
export type WizardEventListenerRegister<T> = (
  cb: (data: WizardEventData<T>) => void,
) => void
export type WizardEventListenner<T> = {
  once: WizardEventListenerRegister<T>
  always: WizardEventListenerRegister<T>
}
export type WizardNextEventData = { stopped: boolean }

export type EventListenerRegister = {
  [K in keyof WizardHandle['on']]: Parameters<
    WizardHandle['on'][K]['always']
  >[0][]
}

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
  on: {
    next: WizardEventListenner<WizardNextEventData>
  }
  eventListenners: ReactiveState<Partial<EventListenerRegister>>
}

const addEventListener = <K extends keyof WizardHandle['on']>(
  register: WizardHandle['eventListenners'],
  name: K,
  cb: (data: any) => void,
) => {
  register.state[name] = register.state[name] || []
  register.state = {
    ...register.state,
    [name]: [...(register.state?.[name] || []), cb],
  }
}
const removeEventListener = <K extends keyof WizardHandle['on']>(
  register: WizardHandle['eventListenners'],
  name: K,
  cb: (data: any) => void,
) => {
  register.state[name] = register.state[name] || []
  register.state = {
    ...register.state,
    [name]: register.state?.[name]?.filter((e) => e != cb),
  }
}

export const createWizardEventRegisters = <K extends keyof WizardHandle['on']>(
  name: K,
  register: WizardHandle['eventListenners'],
) => ({
    always: (cb: Parameters<WizardHandle['on'][K]['always']>[0]) =>
      addEventListener(register, name, cb),
    once: (cb: Parameters<WizardHandle['on'][K]['once']>[0]) => {
      const wrap = (data: Parameters<typeof cb>[0]) => {
        cb(data)
        removeEventListener(data.wizard.eventListenners, name, wrap)
      }
      addEventListener(register, name, wrap)
    },
  })
