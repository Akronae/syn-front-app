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
import { log } from '@proto-native/utils/log'
import { useCompensateSteps } from './use-compensate-steps'

export type WizardBodyProps<T, T2> = BaseProps & {
  data: { reactive: ReactiveState<T>; static: T2 }
  step?: ReactiveState<number>
  name?: ReactiveState<string>
}

export const WizardBody = forwardRef<WizardHandle, WizardBodyProps<any, any>>(
  (props: WizardBodyProps<any, any>, ref) => {
    const {
      children,
      data,
      step: stepProps,
      name: nameProps,
      ...passed
    } = props

    const byType = useGroupChildrenByType(children, { Step: WizardStep })
    const stepElems = byType.Step
    const name = useExistingStateOr(nameProps, ``)
    const step = {
      current: useExistingStateOr(stepProps, 0),
      count: stepElems.length,
      elem: stepElems[stepProps?.state || 0],
    }
    useCompensateSteps(step.current, stepElems)
    setImmediate(() => {
      name.state = step.elem.props.id
    })
    const activeChild = useMemo(() => {
      return stepElems[step.current.state]
    }, [children, step.current.state])

    const eventListenners = useState<Partial<EventListenerRegister>>({})

    const go = (to: number | string): boolean => {
      if (typeof to == `number`) {
        log.info(`Going from wizard step`, step.current.state, `to`, to)
        if (stepElems[to] == undefined) {
          log.warn(`Wizard step with index "${to}" not found`, stepElems)
          return false
        }

        step.current.state = to
        step.elem = stepElems[to]

        eventListenners.state?.change?.forEach((cb) =>
          cb({ data: null, wizard: wizardValue }),
        )

        return true
      }

      const index = stepElems.findIndex((e) => e.props.id == to)
      if (index == -1) {
        throw new Error(`Wizard step with id "${to}" not found`)
      }
      log.info(`Going to step with id`, to, `(${index})`)
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
        change: createWizardEventRegisters(`change`, eventListenners),
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
