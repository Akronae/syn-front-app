import { Base } from '@proto-native/components/base'
import { Text } from '@proto-native/components/text'
import { Ionicons } from '@expo/vector-icons'

import {
  useExistingStateOr,
  useGroupChildrenByType,
  useState,
} from '@proto-native/utils'
import { themed } from '@proto-native/utils/theme/themed'
import React, { ReactElement, useEffect, useMemo } from 'react'
import {
  InputBase,
  InputBaseProps,
} from '@proto-native/components/input/input-base'
import {
  Dropdown,
  DropdownItemProps,
  DropdownProps,
} from '@proto-native/components/dropdown'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'

export type InputSelectProps<
  TModel = string,
  TSlotProps = any,
> = InputBaseProps<TModel | undefined, TSlotProps> & {
  openIndicator?: React.ComponentType<Partial<TSlotProps>>
  textSlot?: {
    selected?: {
      style?: ReturnType<ThemedStyle>
    }
    placeholder?: {
      style?: ReturnType<ThemedStyle>
    }
  }
}

export function InputSelect<TModel = string>(props: InputSelectProps<TModel>) {
  let {
    children,
    isFocused: isFocusedProps,
    dropdown,
    rightSlot,
    openIndicator,
    textSlot,
    ...passed
  } = props
  const model = useExistingStateOr(props.model, undefined)
  const isFocused = useExistingStateOr(isFocusedProps, false)
  const childrenBy = useGroupChildrenByType(children, {
    Dropdown: Dropdown,
    Placeholder: InputSelect.Placeholder,
    Selected: InputSelect.Selected,
  })

  const selectedItem = useState<ReactElement<DropdownItemProps> | null>(null)
  useEffect(() => {
    model.state = selectedItem.state?.props.value
  }, [selectedItem.state])

  useEffect(() => {
    if (model.state) {
      const found = childrenBy.Dropdown.map((child) => {
        return child.props.children.find(
          (item: ReactElement<DropdownItemProps>) =>
            item.props.value === model.state,
        )
      })
      selectedItem.state = found[0] as ReactElement<DropdownItemProps>
    }
  }, [model.state])

  if (!dropdown) dropdown = {}
  const showDropdown = useState(dropdown?.show?.state ?? false)
  dropdown.show = showDropdown
  showDropdown.state = useMemo(() => {
    return isFocused?.state || false
  }, [isFocused?.state])

  return (
    <InputContainer
      {...passed}
      model={model}
      dropdown={dropdown}
      isFocused={isFocused}
      onPress={() => {
        isFocused.state = !isFocused.state
      }}
    >
      {selectedItem.state ? (
        <InputSelect.Selected style={textSlot?.selected?.style}>
          {selectedItem.state.props.children}
        </InputSelect.Selected>
      ) : (
        childrenBy.Placeholder.map((child, i) => {
          return React.cloneElement(child, {
            key: i,
            style: textSlot?.placeholder?.style,
          })
        })
      )}
      {childrenBy.Dropdown.map((child, i) => {
        return React.cloneElement(child, {
          key: i,
          onItemPress: (item: any) => {
            isFocused.state = false
            child.props.onItemPress?.(item)
          },
        })
      })}
      {childrenBy.others}
      <IconWrapper>
        {(openIndicator && React.createElement(openIndicator, props)) || (
          <Ionicons name={showDropdown.state ? `chevron-up` : `chevron-down`} />
        )}
      </IconWrapper>
      {rightSlot?.(props)}
    </InputContainer>
  )
}

InputSelect.Option = themed<DropdownItemProps>(
  InputBase.Dropdown.Item,
  (p) => ({}),
)

InputSelect.Placeholder = themed(Text, (p) => ({}))
InputSelect.Selected = themed(Text, (p) => ({}))
InputSelect.Dropdown = themed<DropdownProps>(InputBase.Dropdown, (p) => ({}))

const InputContainer = themed<InputBaseProps>(InputBase, (p) => ({
  gap: p.theme.protonative.spacing(2),
}))

const IconWrapper = themed(Base, (p) => ({
  marginLeft: `auto`,
}))
