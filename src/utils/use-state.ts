import { ReactiveState } from '@proto-native/utils/reactive-state'
import React from 'react'

/**
 * useState() wrapper that returns a ReactiveState object.
 */
export function useState<T>(data: T) {
  const initial = React.useState<T>(data)
  const state = new ReactiveState(...React.useState(data))
  state.initial = initial[0]
  return state
}
