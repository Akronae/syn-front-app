import { Base, BaseProps } from '@proto-native/components/base'
import { ReactiveState, useExistingStateOr } from '@proto-native/utils'
import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import { WizardContext } from './wizard-context'
import { WizardHandle } from './wizard-handle'

export type WizardBodyProps<T> = BaseProps & {
  data: ReactiveState<T>
  step?: ReactiveState<number>
}

export const WizardBody = forwardRef((props: WizardBodyProps<any>, ref) => {
  const { children, data, step: stepProps, ...passed } = props

  const step = useExistingStateOr(stepProps, 0)

  const activeChild = useMemo(() => {
    const c = React.Children.toArray(children)
    return c[step.state]
  }, [children, step.state])

  const go = (to: number) => {
    console.log(`Going from wizard step`, step.state, `to`, to)
    step.state = to
  }
  const back = () => {
    if (wizardValue.guards.back) {
      if (!wizardValue.guards.back()) {
        console.warn(`Wizard back guard prevented going backwards`, wizardValue)
        return
      }
    }
    go(step.state - 1)
  }
  const next = () => {
    if (wizardValue.guards.next) {
      if (!wizardValue.guards.next()) {
        console.warn(`Wizard next guard prevented going forwards`, wizardValue)
        return
      }
    }
    go(step.state + 1)
  }
  const wizardValue: WizardHandle = {
    step,
    back,
    next,
    go,
    data,
    guards: {},
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
