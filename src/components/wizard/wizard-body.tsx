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

export type WizardBodyProps<T, T2> = BaseProps & {
  data: { reactive: ReactiveState<T>; static: T2 }
  step?: ReactiveState<number>
}

export const WizardBody = forwardRef(
  (props: WizardBodyProps<any, any>, ref) => {
    const { children, data, step: stepProps, ...passed } = props

    const byType = useGroupChildrenByType(children, { Step: WizardStep })
    const stepElems = byType.Step
    const step = {
      current: useExistingStateOr(stepProps, 0),
      count: stepElems.length,
      elem: stepElems[stepProps?.state || 0],
    }
    const activeChild = useMemo(() => {
      return stepElems[step.current.state]
    }, [children, step.current.state])

    const eventListenners = useState<Partial<EventListenerRegister>>({})

    const go = (to: number | string): boolean => {
      if (typeof to == `number`) {
        console.log(`Going from wizard step`, step.current.state, `to`, to)
        if (stepElems[to] == undefined) return false
        step.current.state = to
        step.elem = stepElems[to]
        return true
      }

      const index = stepElems.findIndex((e) => e.props.id == to)
      if (index == -1) {
        throw new Error(`Wizard step with id "${to}" not found`)
      }
      console.log(`Going to step with id`, to, `(${index})`)
      return go(index)
    }
    const back = async (): Promise<boolean> => {
      if (wizardValue.guards.back) {
        if (!(await wizardValue.guards.back())) {
          console.warn(
            `Wizard back guard prevented going backwards`,
            wizardValue,
          )
          return false
        }
      }
      return go(step.current.state - 1)
    }

    const next = (): Promise<boolean> => {
      const n = async () => {
        if (wizardValue.guards.next) {
          if (!(await wizardValue.guards.next())) {
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
  },
)
WizardBody.displayName = `Wizard.Body`

const WizardBodyBase = Base
