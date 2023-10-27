import { useMemo } from 'react'
import * as Native from 'react-native'

export function useFlatStyle<T>(style: Native.StyleProp<T>, deps?: any[]) {
  return useMemo(
    () => Native.StyleSheet.flatten(style),
    [style, ...(deps ?? [])],
  )
}
