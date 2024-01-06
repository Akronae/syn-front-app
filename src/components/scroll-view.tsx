import {
  Base,
  BaseProps,
  takeBaseOwnProps,
} from '@proto-native/components/base'
import * as Native from 'react-native'

export type ScrollViewProps = Native.ScrollViewProps & {
  gap?: Native.ViewStyle['gap']
  flex?: Native.ViewStyle['flex']
}

export function ScrollView(props: ScrollViewProps) {
  const { children, gap, flex, ...passed } = props

  return (
    <Native.ScrollView
      {...passed}
      contentContainerStyle={{ display: 'flex', flex, gap }}
    >
      {children}
    </Native.ScrollView>
  )
}
