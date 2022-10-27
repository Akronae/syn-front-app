import { PropsWithChildren } from 'react'
import * as React from 'react-native'
import { StyleProp, View, ViewStyle } from 'react-native'

export interface BaseProps<TStyle = ViewStyle> extends PropsWithChildren {
  style?: StyleProp<TStyle>
}

export function Base(props: BaseProps) {
  const { style, children, ...passed } = props

  return (
    <View style={[style, styles.Base]} {...passed}>
      {children}
    </View>
  )
}

const styles = React.StyleSheet.create({
  Base: {},
})

export const BaseStyles = styles
