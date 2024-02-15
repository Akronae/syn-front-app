import { BaseProps } from '@proto-native/components/base'
import { useState } from '@proto-native/utils/use-state'
import { isAndroid, isIos } from './device'

export function useHover(
  props?: Partial<Pick<BaseProps, 'onMouseEnter' | 'onMouseLeave'>>,
) {
  const isHovered = useState(false)

  if (isAndroid() || isIos()) return { isHovered, hoverListenners: {} }

  const onMouseEnter = (e: any) => {
    isHovered.state = true
    props?.onMouseEnter?.(e)
  }

  const onMouseLeave = (e: any) => {
    isHovered.state = false
    props?.onMouseLeave?.(e)
  }

  return { isHovered, hoverListenners: { onMouseEnter, onMouseLeave } }
}
