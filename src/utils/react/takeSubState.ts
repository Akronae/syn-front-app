import { SetStateAction } from "react"
import { ReactiveState } from "~/utils/react/ReactiveState"
import { set } from "~/utils/object/set"
import { get } from "~/utils/object/get"

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