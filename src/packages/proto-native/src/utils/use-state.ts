import { ReactiveState } from '@proto-native'
import React from 'react'

/**
 * useState() wrapper that returns a ReactiveState object.
 */
export function useState<T>(data: T) {
  return new ReactiveState(...React.useState(data))
}
