import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'
import { DropdownItem, DropdownItemProps } from './dropdown-item'
import { useGroupChildrenByType, useState } from '@proto-native/utils'
import * as Native from 'react-native'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'
import { useWindowDimensions } from 'react-native'
import { View } from '../view'
import { Text } from '../text'

export type DropdownProps = BaseProps & {
  onItemPress?: (item: React.ReactElement<DropdownItemProps>) => void
  onDismiss?: () => void
  modal?: {
    overlay?: {
      style: ReturnType<ThemedStyle>
    }
  }
}

export function Dropdown(props: DropdownProps) {

  // return <Native.Modal transparent={true}>
  //   <Text>torlloloo!</Text>
  // </Native.Modal>

  const { children, style, modal, onDismiss, ...passed } = props
  const childrenBy = useGroupChildrenByType(children, {
    DropdownItem: Dropdown.Item,
  })

  if (!childrenBy.DropdownItem.length) return null

  const anchor = React.useRef<Native.View>(null)
  const anchorLayout = useState({ top: 0, left: 0, width: 0, height: 0 })
  const anchorLayoutLoaded = useState(false)
  const onAnchorViewLayout = React.useCallback(() => {
    anchor.current?.measureInWindow((x, y, width, height) => {
      anchorLayout.state = { top: y, left: x, width, height }
      anchorLayoutLoaded.state = true
    })
  }, [])
  const onChildrenWrapperLayout = React.useCallback((e: Native.LayoutChangeEvent) => {
    childrenWrapperLayout.state =  e.nativeEvent.layout
    childrenWrapperLayoutLoaded.state = true
  }, [])
  const childrenWrapperLayoutLoaded = useState(false)
  const childrenWrapperLayout = useState({ width: 0, height: 0, x: 0, y: 0 })
  const layoutsLoaded = anchorLayoutLoaded.state && childrenWrapperLayoutLoaded.state

  const viewport = useWindowDimensions()

  const childrenWrapperStyle = {
    top: Math.min(viewport.height - childrenWrapperLayout.state.height, anchorLayout.state.top),
    left: anchorLayout.state.left,
    width: anchorLayout.state.width,
    ...Native.StyleSheet.flatten(style),
    opacity: layoutsLoaded ? 1 : 0,
  }

  console.log('rerender!')

  return (
    <DropdownBase {...passed}>
      {/* Empty view that gives us the position of the parent element */}
      <Native.View ref={anchor} onLayout={onAnchorViewLayout} />

      <Native.Modal transparent={true}>
        {/* Modal overlay used to apply styling (i.e: background) & receive dismiss touch */}
        <Native.TouchableWithoutFeedback onPress={() => onDismiss?.()}>
          <Native.View
            style={{
              position: `absolute`,
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              ...modal?.overlay?.style,
            }}
          />
        </Native.TouchableWithoutFeedback>

        <Native.View
          style={childrenWrapperStyle}
          onLayout={onChildrenWrapperLayout}
        >
          {childrenBy.DropdownItem.map((child, index) => {
            return React.cloneElement(child, {
              key: index,
              onPress: () => {
                child.props.onPress?.()
                props.onItemPress?.(child)
              },
            })
          })}
        </Native.View>
      </Native.Modal>
    </DropdownBase>
  )
}
Dropdown.Item = DropdownItem

const DropdownBase = themed<DropdownProps>(Base, (p) => ({}))
