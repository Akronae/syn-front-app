import { BaseProps } from '@proto-native/components/base'
import { useState } from '@proto-native/utils/use-state'

export function usePressed(
  props?: Partial<
    Pick<BaseProps, 'onPressIn' | 'onPressOut' | 'onTouchEnd' | 'onTouchStart' | 'onTouchCancel'>
  >,
) {
  const isPressed = useState(false)

  const onPressIn = (e: any) => {
    isPressed.state = true
    props?.onPressIn?.(e)
  }

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

  const onTouchCancel = (e: any) => {
    isPressed.state = false
    props?.onTouchCancel?.(e)
  }

  return {
    isPressed,
    pressListenners: { onPressIn, onPressOut, onTouchEnd, onTouchStart, onTouchCancel },
  }
}
