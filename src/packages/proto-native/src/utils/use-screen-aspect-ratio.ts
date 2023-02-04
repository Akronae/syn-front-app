import { useWindowDimensions } from 'react-native'

export function useScreenAspectRatio() {
  const dimensions = useWindowDimensions()
  return dimensions.width / dimensions.height
}
