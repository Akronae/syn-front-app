import { BaseProps } from '@proto-native/components/base'
import { useState } from '@proto-native/utils/use-state'

export function useActive(
  props?: Partial<
    Pick<BaseProps, 'onPressOut' | 'onTouchEnd' | 'onTouchStart'>
  >,
) {
  const isActive = useState(false)

  const onPressOut = (e: any) => {
    isActive.state = false
    props?.onPressOut?.(e)
  }

  const onTouchEnd = (e: any) => {
    isActive.state = false
    props?.onTouchEnd?.(e)
  }

  const onTouchStart = (e: any) => {
    isActive.state = true
    props?.onTouchStart?.(e)
  }

  return {
    isActive,
    activeListenners: { onPressOut, onTouchEnd, onTouchStart },
  }
}
