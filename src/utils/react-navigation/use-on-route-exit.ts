import { useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react'

export function useOnRouteExit(callback: () => void) {
  const isFocused = useIsFocused()
  useEffect(() => {
    if (!isFocused) {
      callback()
    }
  }, [isFocused])
}
