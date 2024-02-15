import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'
import { DropdownItem, DropdownItemProps } from './dropdown-item'
import {
  isAndroid,
  ReactiveState,
  useExistingStateOr,
  useFlatStyle,
  useGroupChildrenByType,
  useState,
} from '@proto-native/utils'
import * as Native from 'react-native'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'
import {
  FlatListProps,
  StatusBar,
  StyleProp,
  useWindowDimensions,
} from 'react-native'
import { Modal, ModalProps } from '@proto-native/components/modal'
import { isWeb } from '@proto-native/utils/device/is-web'

import { FlatList } from 'react-native'

export type DropdownProps = BaseProps & {
  onItemPress?: (item: React.ReactElement<DropdownItemProps>) => void
  onDismiss?: () => void
  modal?: {
    overlay?: {
      style: ReturnType<ThemedStyle>
    }
    wrapper: ModalProps['wrapper']
  }
  open?: ReactiveState<boolean>
  wrapperProps?: BaseProps
}

export function Dropdown(props: DropdownProps) {
  const {
    children,
    style,
    modal,
    onDismiss,
    open: openProps,
    wrapperProps,
    ...passed
  } = props
  const childrenBy = useGroupChildrenByType(children, {
    DropdownItem: Dropdown.Item,
    Header: Dropdown.Header,
  })
  const open = useExistingStateOr(openProps, true)
  const flatStyle = useFlatStyle(style)

  const anchor = React.useRef<Native.View>(null)
  const anchorLayout = useState({ top: 0, left: 0, width: 0, height: 0 })
  const anchorLayoutLoaded = useState(false)
  const onAnchorViewLayout = React.useCallback(() => {
    anchor.current?.measureInWindow((x, y, width, height) => {
      anchorLayout.state = { top: y, left: x, width, height }
      setTimeout(() => {
        anchorLayoutLoaded.state = true
      }, 50)
    })
  }, [])

  const childrenWrapperLayoutLoaded = useState(false)
  const childrenWrapperLayout = useState({ width: 0, height: 0, x: 0, y: 0 })
  const onChildrenWrapperLayout = React.useCallback(
    (e: Native.LayoutChangeEvent) => {
      childrenWrapperLayout.state = e.nativeEvent.layout
      setTimeout(() => {
        childrenWrapperLayoutLoaded.state = true
      }, 50)
    },
    [],
  )

  const initialBodyOverflowMode = useState(
    isWeb() ? document.body.style.overflow : null,
  )

  const layoutsLoaded =
    anchorLayoutLoaded.state && childrenWrapperLayoutLoaded.state

  const viewport = useWindowDimensions()

  const marginTop = parseFloat(flatStyle.marginTop?.toString() ?? `0`)
  const paddingTop = parseFloat(flatStyle.paddingTop?.toString() ?? `0`)
  const paddingBottom = parseFloat(flatStyle.paddingBottom?.toString() ?? `0`)
  const borderWidth = parseFloat(flatStyle.borderWidth?.toString() ?? `0`)
  const childrenWrapperStyle: StyleProp<Native.ViewStyle> = {
    top: Math.max(
      0,
      Math.min(
        viewport.height -
          (childrenWrapperLayout.state.height +
            marginTop +
            paddingTop +
            paddingBottom +
            borderWidth * 2),
        anchorLayout.state.top +
          // idk why we have to do that on Android
          (isAndroid() ? StatusBar.currentHeight ?? 0 : 0),
      ),
    ),
    left: Math.max(
      0,
      Math.min(
        viewport.width - childrenWrapperLayout.state.width,
        anchorLayout.state.left,
      ),
    ),
    width: anchorLayout.state.width,
    opacity: layoutsLoaded ? 1 : 0,
  }

  if (!layoutsLoaded && isWeb()) document.body.style.overflow = `hidden`
  if (layoutsLoaded && isWeb())
    setTimeout(() => {
      document.body.style.overflow = initialBodyOverflowMode.state ?? `visible`
    }, 100)

  const dropdownItems = React.useMemo(() => {
    return [
      ...childrenBy.DropdownItem.map((child, index) => {
        return React.cloneElement<DropdownItemProps>(child, {
          key: index,
          onTouchStart: (e: any) => {
            if (child.props.interactive === false) return
            setTimeout(() => {
              child.props.onPress?.(e)
              child.props.onTouchStart?.(e)
              props.onItemPress?.(child)
            }, 300)
          },
        })
      }),
      ...childrenBy.others,
    ]
  }, [childrenBy.DropdownItem, childrenBy.others])

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
        wrapper={modal?.wrapper}
        style={modal?.overlay?.style}
        open={open}
        portalName={`dropdown`}
      >
        <Base style={childrenWrapperStyle}>
          <Base {...wrapperProps} style={style}>
            <Base>{childrenBy.Header}</Base>
            <Wrapper
              onLayout={onChildrenWrapperLayout}
              data={dropdownItems}
              renderItem={(d) => d.item}
            >
              {childrenBy.others}
            </Wrapper>
          </Base>
        </Base>
      </Modal>
    </DropdownBase>
  )
}
Dropdown.Item = DropdownItem
Dropdown.Header = themed<BaseProps>(Base, (p) => ({}))

const DropdownBase = themed<DropdownProps>(Base, (p) => ({}))

const Wrapper = themed<FlatListProps<any>>(FlatList, (p) => ({}))
