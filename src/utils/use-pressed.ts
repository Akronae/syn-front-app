import { BaseProps } from '@proto-native/components/base'
import { useState } from '@proto-native/utils/use-state'

export function usePressed(
  props?: Partial<
    Pick<BaseProps, 'onPressOut' | 'onTouchEnd' | 'onTouchStart'>
  >,
) {
  const isPressed = useState(false)

  const onPressOut = (e: any) => {
    isPressed.state = false
    props?.onPressOut?.(e)
  }

  const onTouchEnd = (e: any) => {
    isPressed.state = false
    props?.onTouchEnd?.(e)
  }

  const onTouchStart = (e: any) => {
    isPressed.state = true
    props?.onTouchStart?.(e)
  }

  return {
    isPressed,
    pressedListenners: { onPressOut, onTouchEnd, onTouchStart },
  }
}
