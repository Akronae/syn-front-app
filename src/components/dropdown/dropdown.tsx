import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'
import { DropdownItem, DropdownItemProps } from './dropdown-item'
import { useGroupChildrenByType, useState } from '@proto-native/utils'
import * as Native from 'react-native'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'

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
  const { children, style, modal, onDismiss, ...passed } = props
  const childrenBy = useGroupChildrenByType(children, {
    DropdownItem: Dropdown.Item,
  })
  const position = useState({ top: 0, left: 0, width: 0, height: 0 })

  if (!childrenBy.DropdownItem.length) return null

  const anchorView = React.useRef<Native.View>(null)
  const anchorViewLayoutLoaded = useState(false)
  const onAnchorViewLayout = React.useCallback(() => {
    anchorView.current?.measureInWindow((x, y, width, height) => {
      position.state = { top: y, left: x, width, height }
      anchorViewLayoutLoaded.state = true
    })
  }, [])

  return (
    <DropdownBase {...passed}>
      {/* Empty view that gives us the position of the parent element */}
      <Native.View ref={anchorView} onLayout={onAnchorViewLayout} />

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
          style={{
            top: position.state.top,
            left: position.state.left,
            width: position.state.width,
            ...Native.StyleSheet.flatten(style),
            opacity: anchorViewLayoutLoaded.state ? 1 : 0,
          }}
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
