import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'
import { DropdownItem, DropdownItemProps } from './dropdown-item'
import {
  ReactiveState,
  useExistingStateOr,
  useGroupChildrenByType,
  useState,
} from '@proto-native/utils'
import * as Native from 'react-native'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'
import { useWindowDimensions } from 'react-native'
import { Modal } from '@proto-native/components/modal'
import { isWeb } from '@proto-native/utils/device/is-web'

export type DropdownProps = BaseProps & {
  onItemPress?: (item: React.ReactElement<DropdownItemProps>) => void
  onDismiss?: () => void
  modal?: {
    overlay?: {
      style: ReturnType<ThemedStyle>
    }
  }
  open?: ReactiveState<boolean>
}

export function Dropdown(props: DropdownProps) {
  const {
    children,
    style,
    modal,
    onDismiss,
    open: openProps,
    ...passed
  } = props
  const childrenBy = useGroupChildrenByType(children, {
    DropdownItem: Dropdown.Item,
  })
  const open = useExistingStateOr(openProps, true)

  const anchor = React.useRef<Native.View>(null)
  const anchorLayout = useState({ top: 0, left: 0, width: 0, height: 0 })
  const anchorLayoutLoaded = useState(false)
  const onAnchorViewLayout = React.useCallback(() => {
    anchor.current?.measureInWindow((x, y, width, height) => {
      anchorLayout.state = { top: y, left: x, width, height }
      setTimeout(() => {
        anchorLayoutLoaded.state = true
      }, 100)
    })
  }, [])

  const childrenWrapperLayoutLoaded = useState(false)
  const childrenWrapperLayout = useState({ width: 0, height: 0, x: 0, y: 0 })
  const onChildrenWrapperLayout = React.useCallback(
    (e: Native.LayoutChangeEvent) => {
      childrenWrapperLayout.state = e.nativeEvent.layout
      setTimeout(() => {
        childrenWrapperLayoutLoaded.state = true
      }, 100)
    },
    [],
  )

  const initialBodyOverflowMode = useState(
    isWeb() ? document.body.style.overflow : null,
  )

  const layoutsLoaded =
    anchorLayoutLoaded.state && childrenWrapperLayoutLoaded.state

  const viewport = useWindowDimensions()

  const childrenWrapperStyle = {
    top: Math.min(
      viewport.height - childrenWrapperLayout.state.height,
      anchorLayout.state.top,
    ),
    left: Math.min(
      viewport.width - childrenWrapperLayout.state.width,
      anchorLayout.state.left,
    ),
    width: anchorLayout.state.width,
    opacity: layoutsLoaded ? 1 : 0,
  }

  if (!layoutsLoaded && isWeb()) document.body.style.overflow = `hidden`
  if (layoutsLoaded && isWeb())
    setTimeout(() => {
      document.body.style.overflow = initialBodyOverflowMode.state ?? `visible`
    }, 100)

  if (!children) return null

  return (
    <DropdownBase {...passed}>
      {/* Empty view that gives us the position of the parent element */}
      <Native.View ref={anchor} onLayout={onAnchorViewLayout} />

      <Modal
        overlay={{
          ...modal?.overlay,
          onPress: () => {
            onDismiss?.()
          },
          dismissOnPress: true,
        }}
        open={open}
        style={childrenWrapperStyle}
      >
        <Base style={style} onLayout={onChildrenWrapperLayout}>
          {childrenBy.DropdownItem.map((child, index) => {
            return React.cloneElement<DropdownItemProps>(child, {
              key: index,
              onTouchStart: (e: any) => {
                if (child.props.interactive === false) return
                child.props.onTouchStart?.(e)
                props.onItemPress?.(child)
              },
            })
          })}
          {childrenBy.others}
        </Base>
      </Modal>
    </DropdownBase>
  )
}
Dropdown.Item = DropdownItem

const DropdownBase = themed<DropdownProps>(Base, (p) => ({}))
