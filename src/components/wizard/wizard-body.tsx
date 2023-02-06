import { Base, BaseProps } from '@proto-native/components/base'
import { ReactiveState, useExistingStateOr } from '@proto-native/utils'
import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import styled from 'styled-components/native'
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

  const back = () => {
    if (wizardValue.guards.back) {
      if (!wizardValue.guards.back()) return
    }
    step.state = step.state - 1
  }
  const next = () => {
    if (wizardValue.guards.next) {
      if (!wizardValue.guards.next()) return
    }
    step.state = step.state + 1
  }
  const wizardValue: WizardHandle = {
    step,
    back,
    next,
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

const WizardBodyBase = styled(Base)`` as typeof Base
