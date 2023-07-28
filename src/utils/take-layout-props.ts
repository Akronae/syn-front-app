import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

type Base = {
  style?: StyleProp<ViewStyle>
}

export function takeLayoutProps<T extends Base>(props: T) {
  const { style, ...rest } = props
  const flatStyle = StyleSheet.flatten(style)
  const { width, height, flex, flexDirection, alignItems, gap, ...restStyle } =
    flatStyle || {}
  return {
    rest: {
      ...rest,
      style: restStyle,
    },
    taken: {
      style: {
        width,
        height,
        flex,
        flexDirection,
        alignItems,
        gap,
      },
    },
  }
}
