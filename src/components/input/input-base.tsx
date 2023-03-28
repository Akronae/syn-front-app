import { Ionicons } from '@expo/vector-icons'
import {
  Base,
  BaseProps,
  takeBaseOwnProps,
} from '@proto-native/components/base'
import {
  FormFieldState,
  useForm,
  useFormField,
} from '@proto-native/components/form'
import { takeTextOwnProps } from '@proto-native/components/text'
import {
  hexLerp,
  ReactiveState,
  useExistingStateOr,
  useGroupChildrenByType,
} from '@proto-native/utils'
import { themed } from '@proto-native/utils/theme/themed'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'
import { isUndefined, omit, omitBy } from 'lodash-es'
import React, { ReactElement, useEffect } from 'react'
import * as Native from 'react-native'
import { useTheme } from 'styled-components/native'
import {
  Dropdown,
  DropdownProps,
  DropdownItemProps,
} from '@proto-native/components/dropdown'

export type InputBaseProps<TModel = any, TSlotProps = any> = BaseProps<
  Native.TextStyle,
  Native.TextInputProps
> & {
  model?: ReactiveState<TModel>
  focused?: {
    style?: ReturnType<ThemedStyle>
  }
  isFocused?: ReactiveState<boolean>
  isInvalid?: ReactiveState<boolean>
  invalid?: {
    style?: ReturnType<ThemedStyle>
  }
  input?: {
    style?: ReturnType<ThemedStyle>
  }
  icon?: {
    ionicons?: keyof (typeof Ionicons)[`glyphMap`]
    custom?: React.ComponentType<Partial<InputBaseProps>>
  }
  dropdown?: {
    show?: ReactiveState<boolean>
  }
  rightSlot?: (props: TSlotProps) => React.ReactNode
  rightSlotProps?: TSlotProps
}

export function InputBase<TModel = any>(props: InputBaseProps<TModel>) {
  const theme = useTheme()
  let {
    children,
    focused: focusedProps,
    isFocused: isFocusedProps,
    isInvalid: isInvalidProps,
    invalid,
    model,
    icon,
    rightSlot,
    rightSlotProps,
    input,
    dropdown,
    ...passed
  } = props
  const textProps = takeTextOwnProps(passed)
  const baseProps = takeBaseOwnProps(textProps.rest)

  const focused = focusedProps ?? {}
  if (!focused.style) focused.style = NativeInputOnFocus({ theme })
  const isFocused = useExistingStateOr(isFocusedProps, false)

  const isInvalid = useExistingStateOr(isInvalidProps, false)
  invalid ??= {}
  invalid.style ??= NativeInputOnInvalid({ theme })

  const formField = useFormField()
  if (formField) formField.input = model
  const form = useForm()
  useEffect(() => {
    if (formField?.state.state == FormFieldState.Error) {
      formField.state.state = FormFieldState.Normal
      form.rerender()
    }
  }, [model?.state])
  useEffect(() => {
    isInvalid.state = formField?.state.state === FormFieldState.Error
  }, [formField?.state])

  if (!dropdown) dropdown = {}
  const showDropdown = useExistingStateOr(dropdown?.show, false)
  dropdown.show = showDropdown

  const childrenBy = useGroupChildrenByType(children, {
    Dropdown: InputBase.Dropdown,
  })

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
        {childrenBy.others.filter((c) => React.isValidElement(c))}
        {rightSlot?.(rightSlotProps)}
      </InputContainer>
      {childrenBy.Dropdown.map((child: ReactElement<DropdownProps>, i) => {
        if (dropdown?.show?.state)
          return React.cloneElement(child, {
            key: i,
            onItemPress: (item: React.ReactElement<DropdownItemProps>) => {
              if (model) model.state = item.props.value
              Native.Keyboard.dismiss()
              child.props.onItemPress?.(item)
            },
          })
      })}
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
