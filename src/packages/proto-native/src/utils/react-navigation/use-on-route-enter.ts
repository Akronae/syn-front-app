import { useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react'

export function useOnRouteEnter(callback: () => void) {
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      callback()
    }
  }, [isFocused])
}
