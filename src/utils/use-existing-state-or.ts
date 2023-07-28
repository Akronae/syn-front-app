import { ReactiveState } from '@proto-native/utils/reactive-state'
import { useState } from '@proto-native/utils/use-state'

/**
 * Returns a new `ReactiveState` based on `fallbackValue` if the passed `ReactiveState` is not defined.
 * Useful for optional models. (`ReactiveState` from parent passed to child as props, but that may remain optional.)
 * As one cannot call hooks conditionally, this function is a workaround.
 * Same as
 * @example
 * const model = props.model || useState(fallbackValue); // ❌ error
 * @example
 * const model = useExistingStateOr(props.model, fallbackValue); // ✔ ok
 */
export function useExistingStateOr<T>(
  model: ReactiveState<T> | T | undefined,
  fallbackValue: T,
): ReactiveState<T> {
  // if model is T instead of ReactiveState<T>
  if (model && model instanceof ReactiveState === false) {
    fallbackValue = model as T
    model = undefined
  }
  const fallbackReactiveState = useState(fallbackValue)
  return (model as ReactiveState<T>) || fallbackReactiveState
}
