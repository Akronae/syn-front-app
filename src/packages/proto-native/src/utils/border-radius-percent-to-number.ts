import { Dimensions } from 'react-native'

export function borderRadiusPercentToNumber(percent: number): number {
  return (
    Math.round(
      Dimensions.get(`window`).width + Dimensions.get(`window`).height,
    ) / 2
  )
}
