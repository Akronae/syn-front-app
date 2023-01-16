import { Base, BaseProps } from '@proto-native/components/base'
import { ReactiveState, useExistingStateOr } from '@proto-native/utils'
import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { WizardContext } from './wizard-context'
import { WizardHandle } from './wizard-handle'

export type WizardBodyProps<T> = BaseProps & {
  data: ReactiveState<T>
  step?: ReactiveState<number>
}

export function WizardBody<T = any>(props: WizardBodyProps<T>) {
  const { children, data, step: stepProps, ...passed } = props

  const step = useExistingStateOr(stepProps, 0)

  const activeChild = useMemo(() => {
    const c = React.Children.toArray(children)
    return c[step.state]
  }, [children, step.state])

  const next = () => {
    step.state = step.state + 1
  }
  const wizardValue: WizardHandle = {
    step,
    next,
    data,
  }

  return (
    <WizardBodyBase {...passed}>
      <WizardContext.Provider value={wizardValue}>
        {activeChild}
      </WizardContext.Provider>
    </WizardBodyBase>
  )
}

const WizardBodyBase = styled(Base)`` as typeof Base
