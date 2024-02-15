import { Base } from '@proto-native/components/base'
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
import { getChildrenByType } from '@proto-native/utils/get-children-by-type'

export type InputSelectProps<
  TModel = string,
  TSlotProps = { isFocused: boolean },
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
  onItemSelect?: (item: ReactElement<DropdownItemProps>) => void
}

export function InputSelect<TModel = string>(props: InputSelectProps<TModel>) {
  let {
    children,
    isFocused: isFocusedProps,
    dropdown,
    rightSlot,
    openIndicator,
    textSlot,
    onPress: onPressProps,
    model: modelProps,
    onItemSelect,
    ...passed
  } = props
  const model = useExistingStateOr(modelProps, undefined)
  const isFocused = useExistingStateOr(isFocusedProps, false)
  const childrenBy = useGroupChildrenByType(children, {
    Dropdown: Dropdown,
    Placeholder: InputSelect.Placeholder,
    Selected: InputSelect.Selected,
  })

  const selectedItem = useState<ReactElement<DropdownItemProps> | null>(null)
  useEffect(() => {
    if (selectedItem.state?.props.value)
      model.state = selectedItem.state?.props.value
  }, [selectedItem.state])

  useEffect(() => {
    if (model.state != null) {
      const found = childrenBy.Dropdown.map((drop) => {
        const { taken: items } = getChildrenByType(
          drop.props.children,
          Dropdown.Item,
        )
        return items.find((item) => item.props.value === model.state)
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

  const OpenIndicator =
    openIndicator ||
    (() => (
      <Ionicons name={showDropdown.state ? `chevron-up` : `chevron-down`} />
    ))

  const placeholder =
    selectedItem.state != null ? (
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
    )

  return (
    <InputContainer
      {...passed}
      model={model}
      dropdown={dropdown}
      isFocused={isFocused}
      onPress={(e: any) => {
        isFocused.state = !isFocused.state
        onPressProps?.(e)
      }}
    >
      {placeholder}
      {childrenBy.Dropdown.map((child, i) => {
        return React.cloneElement(child, {
          key: i,
          onItemPress: (item: React.ReactElement<DropdownItemProps>) => {
            isFocused.state = false
            child.props.onItemPress?.(item)
            onItemSelect?.(item)
          },
        })
      })}
      {childrenBy.others}
      <IconWrapper>
        <OpenIndicator isFocused={showDropdown.state} />
      </IconWrapper>
      {rightSlot?.({ isFocused: showDropdown.state })}
    </InputContainer>
  )
}

InputSelect.Option = themed<DropdownItemProps>(
  InputBase.Dropdown.Item,
  (p) => ({}),
)

InputSelect.Placeholder = InputBase.Placeholder
InputSelect.Selected = themed(Base, (p) => ({}))
InputSelect.Dropdown = themed<DropdownProps>(
  InputBase.Dropdown,
  (p) => ({}),
) as typeof InputBase.Dropdown

const InputContainer = themed<InputBaseProps>(InputBase, (p) => ({
  // gap: p.theme.proto.spacing(2),
}))

const IconWrapper = themed(Base, (p) => ({
  marginLeft: `auto`,
}))
