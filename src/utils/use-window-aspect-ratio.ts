import { useWindowDimensions } from 'react-native'

export function useWindowAspectRatio() {
  const dimensions = useWindowDimensions()
  return dimensions.width / dimensions.height
}
