import { ReactiveState } from '@proto-native/utils'
import { WizardStepProps } from './wizard-step'

export type WizardEventData<T> = { wizard: WizardHandle; data: T }
export type WizardEventListenerRegister<T> = (
  cb: (data: WizardEventData<T>) => void,
) => void
export type WizardEventListenner<T> = {
  once: WizardEventListenerRegister<T>
  always: WizardEventListenerRegister<T>
}
export type WizardNextEventData = {
  /**
   * Wether a wizard guard has stopped a next call
   */
  stopped: boolean
}

export type EventListenerRegister = {
  [K in keyof WizardHandle['on']]: Parameters<
    WizardHandle['on'][K]['always']
  >[0][]
}

export type WizardDataBase<T1, T2> = {
  reactive?: T1
  static?: T2
}

export type WizardHandle<T extends WizardDataBase<any, any> = any> = {
  step: {
    current: ReactiveState<number>
    count: number
    elem: React.ReactElement<WizardStepProps>
  }
  data?: { reactive: ReactiveState<T['reactive']>; static: T['static'] }
  back: () => Promise<boolean>
  next: () => Promise<boolean>
  go: (to: number | string) => boolean
  guards: {
    back?: () => Promise<boolean> | boolean
    next?: () => Promise<boolean> | boolean
  }
  canGo: {
    next: () => boolean
    back: () => boolean
  }
  on: {
    next: WizardEventListenner<WizardNextEventData>
    change: WizardEventListenner<null>
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
        cb(data as any)
        removeEventListener(data.wizard.eventListenners, name, wrap)
      }
      addEventListener(register, name, wrap)
    },
  })
