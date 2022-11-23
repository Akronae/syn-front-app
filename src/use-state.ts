import React from "react"
import { ReactiveState } from '@proto-native/reactive-state'

/**
 * useState() wrapper that returns a ReactiveState object.
 */
export function useState<T>(data: T) {
  return new ReactiveState(...React.useState(data))
}