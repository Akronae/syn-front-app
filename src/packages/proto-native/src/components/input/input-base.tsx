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
import { takeTextOwnProps, Text } from '@proto-native/components/text'
import {
  hexLerp,
  ReactiveState,
  takeLayoutProps,
  useExistingStateOr,
  useGroupChildrenByType,
  useHover,
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
  bindFormField?: boolean
  focused?: {
    style?: ReturnType<ThemedStyle>
  }
  hovered?: {
    style?: ReturnType<ThemedStyle>
  }
  isFocused?: ReactiveState<boolean>
  isHovered?: ReactiveState<boolean>
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
  leftSlot?: (props: TSlotProps) => React.ReactNode
  leftSlotProps?: TSlotProps
  rightSlot?: (props: TSlotProps) => React.ReactNode
  rightSlotProps?: TSlotProps
}

export function InputBase<TModel = any>(props: InputBaseProps<TModel>) {
  const theme = useTheme()
  let {
    children,
    focused: focusedProps,
    hovered: hoveredProps,
    isFocused: isFocusedProps,
    isHovered: isHoveredProps,
    isInvalid: isInvalidProps,
    invalid,
    model,
    bindFormField = true,
    icon,
    leftSlot,
    leftSlotProps,
    rightSlot,
    rightSlotProps,
    input,
    dropdown,
    ...passed
  } = props
  const layoutProps = takeLayoutProps(passed)
  const textProps = takeTextOwnProps(layoutProps.rest)
  const baseProps = takeBaseOwnProps(textProps.rest)

  const focused = focusedProps ?? {}
  if (!focused.style) focused.style = NativeInputOnFocus({ theme })
  const isFocused = useExistingStateOr(isFocusedProps, false)

  const { isHovered: isHoveredHook, hoverListenners } = useHover(props)
  const hovered = hoveredProps ?? {}
  if (!hovered.style) hovered.style = NativeInputOnHover({ theme })
  const isHovered = useExistingStateOr(isHoveredProps, isHoveredHook.state)

  useEffect(() => {
    isHovered.state = isHoveredHook.state
  }, [isHoveredHook.state])

  const isInvalid = useExistingStateOr(isInvalidProps, false)
  invalid ??= {}
  invalid.style ??= NativeInputOnInvalid({ theme })

  const formField = useFormField()
  if (formField && bindFormField) formField.input = model
  const form = useForm()
  useEffect(() => {
    if (form && formField?.state.state == FormFieldState.Error) {
      formField.state.state = FormFieldState.Normal
      form.rerender()
    }
  }, [model?.state])
  useEffect(() => {
    isInvalid.state = formField?.state.state === FormFieldState.Error
  }, [formField?.state])

  if (!dropdown) dropdown = {}
  const dropdownShow = useExistingStateOr(dropdown?.show, false)
  dropdown.show = dropdownShow

  const childrenBy = useGroupChildrenByType(children, {
    Dropdown: InputBase.Dropdown,
  })

  const style = omit(
    Native.StyleSheet.flatten([props.style, textProps.taken.style]) ?? {},
    `textDecoration`,
  )

  const flatStyle = Native.StyleSheet.flatten(style) as Record<string, any>
  const fontSize = flatStyle?.fontSize
  const color = flatStyle?.color
  const stroke = flatStyle?.stroke || color

  const iconStyle = omitBy(
    {
      color: color || theme.proto.colors.text.primary,
      fontSize: fontSize || theme.proto.typography.size.md,
      stroke: stroke || color,
    },
    isUndefined,
  )

  return (
    <Base {...layoutProps.taken} {...hoverListenners}>
      <InputBaseBase>
        <InputContainer
          focused={focused}
          isFocused={isFocused}
          invalid={invalid}
          isInvalid={isInvalid}
          input={input}
          {...layoutProps.rest}
          {...baseProps.taken}
          {...baseProps.rest}
          {...textProps.rest}
          style={Native.StyleSheet.flatten([
            layoutProps.rest.style,
            baseProps.taken.style,
            baseProps.rest.style,
            textProps.rest.style,
            isHovered?.state && hovered?.style,
            isFocused?.state && focused?.style,
            isInvalid?.state && invalid?.style,
            input?.style,
          ])}
        >
          {leftSlot?.(leftSlotProps)}
          {icon?.ionicons && (
            <Icon
              name={icon.ionicons}
              isInvalid={isInvalid}
              invalid={invalid}
              style={iconStyle}
            />
          )}
          {icon?.custom && (
            <icon.custom isInvalid={isInvalid} style={iconStyle} />
          )}
          {childrenBy.others.filter((c) => React.isValidElement(c))}
          {rightSlot?.(rightSlotProps)}
        </InputContainer>
      </InputBaseBase>
      {childrenBy.Dropdown.map((child: ReactElement<DropdownProps>, i) => {
        if (dropdown?.show?.state)
          return React.cloneElement(child, {
            key: i,
            onItemPress: (item: React.ReactElement<DropdownItemProps>) => {
              if (model) {
                model.state = item.props.value
              }
              Native.Keyboard.dismiss()
              child.props.onItemPress?.(item)
            },
            onDismiss: () => {
              isFocused.state = false
              child.props.onDismiss?.()
            },
          })
      })}
    </Base>
  )
}
InputBase.Placeholder = themed(
  (p) => <Text capitalize {...p} />,
  (p) => ({}),
)
InputBase.Dropdown = Dropdown

const InputBaseBase = Base

const NativeInputOnFocus: ThemedStyle = (p) => ({
  borderColor: hexLerp(
    p.theme.proto.colors.surface.sub,
    p.theme.proto.colors.surface.contrast,
    0.05,
  ),
})

const NativeInputOnHover: ThemedStyle = (p) => ({
  borderColor: hexLerp(
    p.theme.proto.colors.surface.sub,
    p.theme.proto.colors.surface.contrast,
    0.02,
  ),
})

const NativeInputOnInvalid: ThemedStyle = (p) => ({
  borderColor: p.theme.proto.colors.surface.error,
  color: p.theme.proto.colors.surface.error,
})

const InputContainer = themed<Partial<InputBaseProps>>(Base, (p) => ({
  display: `flex`,
  flexDirection: `row`,
  alignItems: `center`,
  backgroundColor: p.theme.proto.colors.surface.sub,
  padding: 10,
  borderRadius: 8,
  borderWidth: 2,
  borderStyle: `solid`,
  borderColor: `transparent`,
  flexWrap: `wrap`,
  gap: 10,
}))

const Icon = themed<Partial<InputBaseProps> & { name: string }>(
  Ionicons,
  (p) => ({
    marginRight: p.theme.proto.spacing(2),
    fontFamily: p.theme.proto.typography.font.regular,
    color: p.theme.proto.colors.text.primary,
    fontSize: p.theme.proto.typography.size.md,
    ...(p.isInvalid?.state && p.invalid?.style),
  }),
)
