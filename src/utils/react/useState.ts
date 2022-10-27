import React from "react"
import { ReactiveState } from "~/utils/react/ReactiveState"

/**
 * useState() wrapper that returns a ReactiveState object.
 */
export function useState<T>(data: T) {
  return new ReactiveState(...React.useState(data))
}