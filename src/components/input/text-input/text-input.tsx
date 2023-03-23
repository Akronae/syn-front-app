import { Ionicons } from '@expo/vector-icons'
import { BaseProps, takeBaseOwnProps } from '@proto-native/components/base'
import { FormFieldState, useFormField } from '@proto-native/components/form'
import {
  boldnessToFont,
  getStyleBoldness,
  takeTextOwnProps,
} from '@proto-native/components/text'
import {
  ReactiveState,
  useExistingStateOr,
  useGroupChildrenByType,
  useState,
} from '@proto-native/utils'
import { isIos } from '@proto-native/utils/device/is-ios'
import { isWeb } from '@proto-native/utils/device/is-web'
import { themed } from '@proto-native/utils/theme/themed'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'
import React, { ReactElement, useEffect, useMemo } from 'react'
import * as Native from 'react-native'
import { useTheme } from 'styled-components/native'
import { Dropdown, DropdownProps } from '@proto-native/components/dropdown'
import { InputBase, InputBaseProps } from '@proto-native/components/input/input-base'

export type TextInputProps<TSlotProps = any> = BaseProps<
  Native.TextStyle,
  Native.TextInputProps
> & {
  model?: ReactiveState<string>
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
  }
  input?: {
    style?: ReturnType<ThemedStyle>
  }
  icon?: {
    ionicons?: keyof (typeof Ionicons)[`glyphMap`]
    custom?: React.ComponentType<Partial<TextInputProps>>
  }
  rightSlot?: <TProps extends TSlotProps>(props: TProps) => React.ReactNode
}

export function TextInput(props: TextInputProps) {
  const theme = useTheme()
  let {
    children,
    isFocused: isFocusedProps,
    isInvalid: isInvalidProps,
    invalid,
    dropdown,
    onChangeText: onChangeTextProps,
    onFocus,
    onBlur,
    numberOfLines,
    multiline,
    onKeyPress,
    onSubmitEditing,
    rightSlot,
    input,
    ...passed
  } = props
  numberOfLines ??= 1
  multiline ??= numberOfLines > 1
  const textProps = takeTextOwnProps(passed)
  const baseProps = takeBaseOwnProps(textProps.rest)

  const model = useExistingStateOr(props.model, ``)
  const isFocused = useExistingStateOr(isFocusedProps, false)

  const isInvalid = useExistingStateOr(isInvalidProps, false)
  invalid ??= {}

  const formField = useFormField()
  if (formField) {
    formField.input = model
  }
  useEffect(() => {
    isInvalid.state = formField?.state.state === FormFieldState.Error
  })

  const childrenBy = useGroupChildrenByType(children, { Dropdown: Dropdown })

  if (!dropdown) dropdown = {}
  const showDropdown = useState(dropdown?.show?.state ?? false)
  dropdown.show = showDropdown
  showDropdown.state = useMemo(() => {
    return isFocused?.state || false
  }, [isFocused?.state])

  const placeholder = React.Children.toArray(children).reduce(
    (acc, child) => `${acc} ${child?.toString()}`,
    ``,
  ) as string

  const onKeyPressBase = (
    e: Native.NativeSyntheticEvent<Native.TextInputKeyPressEventData>,
  ) => {
    onKeyPress?.(e)

    if (isWeb()) {
      const event = e.nativeEvent as KeyboardEvent
      if (event.key === `Enter` && event.ctrlKey) {
        onSubmitEditing?.({
          ...e,
          nativeEvent: { ...e.nativeEvent, text: model.state },
        })
      }
    }
  }

  const onChangeText = (text: string) => {
    model.state = text
    if (formField?.state) formField.state.state = FormFieldState.Normal
    onChangeTextProps?.(text)
  }

  const style = Native.StyleSheet.flatten(props.style)
  // https://github.com/facebook/react-native/issues/28012
  const lineHeightOverflow = (style.lineHeight ?? 0) - (style.fontSize ?? 0)
  const iosLineHeightFix = {
    paddingTop: lineHeightOverflow / 2,
    paddingBottom: lineHeightOverflow / 2,
    lineHeight: undefined,
  }

  return (
    <InputContainer
      {...baseProps.taken}
      {...textProps.rest}
      style={[baseProps.taken.style, textProps.rest.style]}
      model={model}
      input={input}
    >
      <NativeInput
        placeholder={placeholder}
        placeholderTextColor={theme.protonative.colors.text.sub}
        value={model.state}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onKeyPress={onKeyPressBase}
        onSubmitEditing={onSubmitEditing}
        isInvalid={isInvalid}
        invalid={invalid}
        {...textProps.taken}
        {...baseProps.rest}
        style={[
          textProps.taken.style,
          baseProps.rest.style,
          isIos() && iosLineHeightFix,
        ]}
        onChangeText={onChangeText}
        onFocus={(e) => {
          if (isFocused) isFocused.state = true
          onFocus?.(e)
        }}
        onBlur={(e) => {
          // in case the input is unfocused by a click on the dropdown
          // we need to wait for the click to be processed
          if (isFocused)
            setImmediate(() => {
              isFocused.state = false
            })
          onBlur?.(e)
        }}
      />
      {rightSlot?.(props)}
      {childrenBy.Dropdown.map((child: ReactElement<DropdownProps>) => {
        if (child.props.children && dropdown?.show?.state) return child
      })}
      {childrenBy.others}
    </InputContainer>
  )
}

TextInput.Dropdown = InputBase.Dropdown

const InputContainer = themed<InputBaseProps>(InputBase, (p) => ({}))

const NativeInput = themed<Partial<TextInputProps>>(Native.TextInput, (p) => ({
  flex: 1,
  ...(isWeb() && {
    outlineWidth: 0,
  }),
  fontFamily: boldnessToFont(
    getStyleBoldness(Native.StyleSheet.flatten(p.style)),
    p.theme,
  ),
  color: p.theme.protonative.colors.text.primary,
  fontSize: p.theme.protonative.typography.size.md,
  ...(p.isInvalid?.state && p.invalid?.style),
}))
