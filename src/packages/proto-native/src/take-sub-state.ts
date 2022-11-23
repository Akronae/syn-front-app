import { get, set } from "lodash-es"
import { SetStateAction } from "react"
import { ReactiveState } from "./reactive-state"

/**
 * Creates a reactive state based on a child of an object.
 * i.e. turns `setState({...state, key: value})` into `setKeyState(value)`.
 */
export function takeSubState<T extends object>(
  key: string,
  reactState: ReactiveState<T>,
): ReactiveState<any> {
  return new ReactiveState(
    get(reactState.state, key),
    (val: SetStateAction<any>) => {
      set(reactState.state, key, val)
      reactState.state = { ...reactState.state }
    },
  )
}