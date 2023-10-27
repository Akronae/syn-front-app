import { ReactiveState } from '@proto-native/utils'
import { log } from '@proto-native/utils/log'
import { ReactElement, useRef } from 'react'

export function useCompensateSteps(
  step: ReactiveState<number>,
  stepElems: ReactElement[],
) {
  const p = useRef<string[]>()

  if (p.current && p.current.length != stepElems.length) {
    const news = stepElems
      .map((e) => e.props.id)
      .filter((e) => !p.current?.includes(e))
    const newsBefore = news.filter(
      (e) => stepElems.findIndex((e2) => e2.props.id == e) < step.state,
    )
    const missing = p.current.filter(
      (e) => !stepElems.map((e2) => e2.props.id).includes(e),
    )
    const missingBefore = missing.filter(
      (e) => stepElems.findIndex((e2) => e2.props.id == e) < step.state,
    )
    if (newsBefore.length > 0) {
      setImmediate(() => {
        log.warn(
          `Wizard steps added before current step`,
          newsBefore,
          `increasing current step to compensate`,
        )
        step.state += newsBefore.length
      })
    }
    if (missingBefore.length > 0) {
      setImmediate(() => {
        log.warn(
          `Wizard steps removed before current step`,
          missingBefore,
          `decreasing current step to compensate`,
        )
        step.state -= missingBefore.length
      })
    }
  }

  p.current = stepElems.map((e) => e.props.id)
}
