import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'
import { GestureResponderEvent } from 'react-native'

const registeredListeners = {
  onPress: [] as ((e: GestureResponderEvent) => void)[],
}

export type GlobalEventsListenerProps = BaseProps

export function useOnGlobalTouch(onPress: (e: GestureResponderEvent) => void) {
  React.useEffect(() => {
    registeredListeners.onPress.push(onPress)
    return () => {
      registeredListeners.onPress = registeredListeners.onPress.filter(
        (listener) => listener !== onPress,
      )
    }
  })
}

export function GlobalEventsListener(props: GlobalEventsListenerProps) {
  const { onPress: onPressProps, ...passed } = props

  const onPress = (e: GestureResponderEvent) => {
    registeredListeners.onPress.forEach((listener) => listener(e))
    onPressProps?.(e)
  }

  return (
    <GlobalEventsListenerBase
      {...passed}
      onStartShouldSetResponder={() => true}
      onPress={onPress}
    ></GlobalEventsListenerBase>
  )
}
const GlobalEventsListenerBase = themed<BaseProps>(Base, (_p) => ({
  flex: 1,
}))
