import { isObjectLike } from 'lodash-es'
import { Dispatch, SetStateAction } from 'react'

/**
 * Extension of the value type returned by React.useState().
 */
export class ReactiveState<T> extends Array<T | Dispatch<SetStateAction<T>>> {
  0: T
  1: Dispatch<SetStateAction<T>>
  initial: T

  constructor(getter: T, setter: Dispatch<SetStateAction<T>>) {
    super()
    this[0] = getter
    this[1] = setter
    this.initial = this[0]
  }

  get getter() {
    return this[0]
  }
  get setter() {
    return this[1]
  }

  get state(): T {
    return this.getter
  }
  set state(state: T) {
    let same = false
    try {
      same = JSON.stringify(this.state) === JSON.stringify(state)
    } catch (e) {
      // assume different
    }
    if (same) return
    this.setter(state)
  }

  reset() {
    this.state = this.initial
  }
  reactivate() {
    if (isObjectLike(this.getter)) this.setter({ ...this.getter })
    else this.setter(this.getter)
  }
}
