import {
  Base,
  BaseProps,
  takeBaseOwnProps,
} from '@proto-native/components/base'
import * as Native from 'react-native'

export type ScrollViewProps = BaseProps<Native.ScrollViewProps>

export function ScrollView(props: ScrollViewProps) {
  const { children, ...passed } = props
  const baseProps = takeBaseOwnProps(passed)

  return (
    <ScrollViewBase {...baseProps.taken}>
      <Native.ScrollView {...baseProps.rest}>{children}</Native.ScrollView>
    </ScrollViewBase>
  )
}

const ScrollViewBase = Base
