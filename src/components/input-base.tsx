import { Ionicons } from '@expo/vector-icons'
import {
  Base,
  BaseProps,
  takeBaseOwnProps,
} from '@proto-native/components/base'
import { FormFieldState, useFormField } from '@proto-native/components/form'
import {
  boldnessToFont,
  getStyleBoldness,
  takeTextOwnProps,
} from '@proto-native/components/text'
import {
  hexLerp,
  ReactiveState,
  useChildrenByType,
  useExistingStateOr,
  useGroupChildrenByType,
  useState,
} from '@proto-native/utils'
import { isIos } from '@proto-native/utils/device/is-ios'
import { isWeb } from '@proto-native/utils/device/is-web'
import { themed } from '@proto-native/utils/theme/themed'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'
import { drop, isEmpty, isUndefined, omit, omitBy } from 'lodash-es'
import React, { useEffect, useMemo } from 'react'
import * as Native from 'react-native'
import { useTheme } from 'styled-components/native'
import { Dropdown } from './dropdown/dropdown'
import { DropdownItemProps } from './dropdown/dropdown-item'

export type InputBaseProps<TSlotProps = any, TModel = any> = BaseProps<
  Native.TextStyle,
  Native.TextInputProps
> & {
  model: ReactiveState<TModel>
  focused?: {
    style?: ReturnType<ThemedStyle>
  }
  isFocused?: ReactiveState<boolean>
  isInvalid?: ReactiveState<boolean>
  invalid?: {
    style?: ReturnType<ThemedStyle>
  }
  dropdown?: {
    show?: ReactiveState<boolean>
    style?: ReturnType<ThemedStyle>
    container?: {
      style?: ReturnType<ThemedStyle>
    }
    focused?: {
      style?: ReturnType<ThemedStyle>
    }
  }
  input?: {
    style?: ReturnType<ThemedStyle>
  }
  icon?: {
    ionicons?: keyof (typeof Ionicons)[`glyphMap`]
    custom?: React.ComponentType<Partial<InputBaseProps>>
  }
  rightSlot?: (props: InputBaseProps) => React.ReactNode
}

export function InputBase<TSlotProps = any, TModel = any>(props: InputBaseProps<TSlotProps, TModel>) {
  const theme = useTheme()
  let {
    children,
    focused: focusedProps,
    isFocused: isFocusedProps,
    isInvalid: isInvalidProps,
    invalid,
    dropdown,
    model,
    onChangeText: onChangeTextProps,
    onFocus,
    onBlur,
    numberOfLines,
    multiline,
    onKeyPress,
    onSubmitEditing,
    icon,
    rightSlot,
    input,
    ...passed
  } = props
  numberOfLines ??= 1
  multiline ??= numberOfLines > 1
  const textProps = takeTextOwnProps(passed)
  const baseProps = takeBaseOwnProps(textProps.rest)

  const focused = focusedProps ?? {}
  if (!focused.style) focused.style = NativeInputOnFocus({ theme })
  const isFocused = useExistingStateOr(isFocusedProps, false)

  const isInvalid = useExistingStateOr(isInvalidProps, false)
  invalid ??= {}
  invalid.style ??= NativeInputOnInvalid({ theme })

  const formField = useFormField()
  useEffect(() => {
    isInvalid.state = formField?.state.state === FormFieldState.Error
  })

  if (!dropdown) dropdown = {}
  if (!dropdown.style) dropdown.style = NativeInputOnDropdown({ theme })
  const showDropdown = useState(dropdown?.show?.state ?? false)
  const childrenBy = useGroupChildrenByType(children, { Dropdown: InputBase.Dropdown })

  const style = omit(
    Native.StyleSheet.flatten([props.style, textProps.taken.style]) ?? {},
    `textDecoration`,
  )

  return (
    <InputBaseBase {...baseProps.taken} {...textProps.rest}>
      <InputContainer
        focused={focused}
        isFocused={isFocused}
        invalid={invalid}
        isInvalid={isInvalid}
        input={input}
      >
        {icon?.ionicons && (
          <Icon
            name={icon.ionicons}
            isInvalid={isInvalid}
            invalid={invalid}
            style={omitBy(
              { color: style.color, fontSize: style.fontSize },
              isUndefined,
            )}
          />
        )}
        {icon?.custom && (
          <icon.custom
            isInvalid={isInvalid}
            style={omitBy(
              { color: style.color, fontSize: style.fontSize },
              isUndefined,
            )}
          />
        )}
        {childrenBy.others}
        {rightSlot?.(props)}
      </InputContainer>
      <DropdownContainer
        showIf={showDropdown.state}
        dropdown={dropdown}
      >
        {childrenBy.Dropdown.map((dropdown, i) => React.cloneElement(dropdown, { key: i, onItemClick: (item: React.ReactElement<DropdownItemProps>) => {
          model.state = item.props.value
          Native.Keyboard.dismiss()
        }}))}
      </DropdownContainer>
    </InputBaseBase>
  )
}

InputBase.Dropdown = Dropdown

const InputBaseBase = Base

const NativeInputOnFocus: ThemedStyle = (p) => ({
  borderColor: hexLerp(
    p.theme.protonative.colors.surface.sub,
    p.theme.protonative.colors.surface.contrast,
    0.05,
  ),
})

const NativeInputOnInvalid: ThemedStyle = (p) => ({
  borderColor: p.theme.protonative.colors.surface.error,
  color: p.theme.protonative.colors.surface.error,
})

const NativeInputOnDropdown: ThemedStyle = (p) => ({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
})

const InputContainer = themed<Partial<InputBaseProps>>(Base, (p) => ({
  display: `flex`,
  flexDirection: `row`,
  alignItems: `center`,
  backgroundColor: p.theme.protonative.colors.surface.sub,
  padding: 10,
  borderRadius: 8,
  borderWidth: 2,
  borderStyle: `solid`,
  borderColor: `transparent`,
  ...(p.isFocused?.state && p.focused?.style),
  ...(p.isInvalid?.state && p.invalid?.style),
  ...p.input?.style,
}))

const DropdownContainer = themed<
  {
    dropdown: InputBaseProps[`dropdown`]
  } & BaseProps
>(Base, (p) => ({
  backgroundColor: p.theme.protonative.colors.surface.sub,
  ...p.dropdown?.container?.style,
}))

const Icon = themed<Partial<InputBaseProps> & { name: string }>(
  Ionicons,
  (p) => ({
    marginRight: p.theme.protonative.spacing(2),
    fontFamily: p.theme.protonative.typography.font.regular,
    color: p.theme.protonative.colors.text.primary,
    fontSize: p.theme.protonative.typography.size.md,
    ...(p.isInvalid?.state && p.invalid?.style),
  }),
)
