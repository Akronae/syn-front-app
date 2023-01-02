import {
  ReactiveState,
  useEnsureChildrenType,
  useExistingStateOr,
  useState,
} from '@proto-native/utils'
import { View, ViewProps } from '@proto-native/components/view'
import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components/native'
import { RadioOption, RadioOptionProps } from './radio-option'

export type RadioProps<T> = ViewProps & {
  children: React.ReactElement<RadioOptionProps>[]
  model?: ReactiveState<T | null>
}

export function Radio<T>(props: RadioProps<T>) {
  const { children, model: modelProps, ...passed } = props

  useEnsureChildrenType(children, RadioOption)
  const model = useExistingStateOr(modelProps, null)
  const activeChild = useState<number | null>(null)

  const wrappedChildren = useMemo(
    () =>
      React.Children.map(children, (child, index) => {
        const onTouchEnd = () => {
          activeChild.state = index
        }
        return React.cloneElement(child, {
          isSelected: activeChild.state === index,
          onTouchEnd,
        })
      }),
    [children, activeChild.state],
  )

  useEffect(() => {
    if (activeChild.state === null) return
    model.state = children[activeChild.state].props.value
  }, [activeChild.state])

  return <RadioBase {...passed}>{wrappedChildren}</RadioBase>
}
Radio.Option = RadioOption

const RadioBase = styled(View)`` as typeof View
