import { Base, BaseProps } from '@proto-native/components/base'
import {
  ReactiveState,
  useExistingStateOr,
  useGroupChildrenByType,
  useState,
} from '@proto-native/utils'
import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import { WizardContext } from './wizard-context'
import {
  createWizardEventRegisters,
  EventListenerRegister,
  WizardHandle,
} from './wizard-handle'
import { WizardStep } from './wizard-step'

export type WizardBodyProps<T> = BaseProps & {
  data: ReactiveState<T>
  step?: ReactiveState<number>
}

export const WizardBody = forwardRef((props: WizardBodyProps<any>, ref) => {
  const { children, data, step: stepProps, ...passed } = props

  const byType = useGroupChildrenByType(children, { Step: WizardStep })
  const stepElems = byType.Step
  const step = {
    current: useExistingStateOr(stepProps, 0),
    count: stepElems.length,
  }
  const activeChild = useMemo(() => {
    return stepElems[step.current.state]
  }, [children, step.current.state])

  const eventListenners = useState<Partial<EventListenerRegister>>({})

  const go = (to: number): boolean => {
    console.log(`Going from wizard step`, step.current.state, `to`, to)
    step.current.state = to
    return stepElems[to] !== undefined
  }
  const back = (): boolean => {
    if (wizardValue.guards.back) {
      if (!wizardValue.guards.back()) {
        console.warn(`Wizard back guard prevented going backwards`, wizardValue)
        return false
      }
    }
    return go(step.current.state - 1)
  }

  const next = (): boolean => {
    const n = () => {
      if (wizardValue.guards.next) {
        if (!wizardValue.guards.next()) {
          console.warn(
            `Wizard next guard prevented going forwards`,
            wizardValue,
          )
          return false
        }
      }
      return go(step.current.state + 1)
    }

    const val = n()
    eventListenners.state?.next?.forEach((cb) =>
      cb({ data: { stopped: !val }, wizard: wizardValue }),
    )
    return val
  }

  const canGo = {
    next: () => step.current.state < step.count - 1,
    back: () => step.current.state > 0,
  }

  const wizardValue: WizardHandle = {
    step,
    back,
    next,
    go,
    data,
    guards: {},
    canGo,
    on: {
      next: createWizardEventRegisters(`next`, eventListenners),
    },
    eventListenners,
  }

  useImperativeHandle(ref, () => wizardValue)

  return (
    <WizardBodyBase {...passed}>
      <WizardContext.Provider value={wizardValue}>
        {activeChild}
      </WizardContext.Provider>
    </WizardBodyBase>
  )
})
WizardBody.displayName = `Wizard.Body`

const WizardBodyBase = Base
