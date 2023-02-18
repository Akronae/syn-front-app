import { Dimensions } from 'react-native'

export function getWindowAspectRatio() {
  const dimensions = Dimensions.get(`window`)
  return dimensions.width / dimensions.height
}
