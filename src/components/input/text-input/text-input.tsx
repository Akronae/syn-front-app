import { takeBaseOwnProps } from '@proto-native/components/base'
import {
  boldnessToFont,
  getStyleBoldness,
  takeTextOwnProps,
} from '@proto-native/components/text'
import { useExistingStateOr, useGroupChildrenByType } from '@proto-native/utils'
import { isIos } from '@proto-native/utils/device/is-ios'
import { isWeb } from '@proto-native/utils/device/is-web'
import { themed } from '@proto-native/utils/theme/themed'
import React, { useEffect, useMemo, useRef } from 'react'
import * as Native from 'react-native'
import { useTheme } from 'styled-components/native'
import {
  InputBase,
  InputBaseProps,
} from '@proto-native/components/input/input-base'
import { createThemedStyle } from '@proto-native/utils/theme/create-themed-style'
import { DropdownProps } from '@proto-native/components/dropdown'

export type TextInputProps<TSlotProps = any> = InputBaseProps<
  string,
  TSlotProps
>
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
    input,
    ...passed
  } = props
  numberOfLines ??= 1
  multiline ??= numberOfLines > 1
  const childrenBy = useGroupChildrenByType(children, {
    Placeholder: TextInput.Placeholder,
    Dropdown: TextInput.Dropdown,
  })
  const textProps = takeTextOwnProps(passed)
  const baseProps = takeBaseOwnProps(textProps.rest)

  const model = useExistingStateOr(props.model, ``)
  const isFocused = useExistingStateOr(isFocusedProps, false)

  const isInvalid = useExistingStateOr(isInvalidProps, false)
  invalid ??= {}

  dropdown ??= {}
  const dropdownShow = useExistingStateOr(dropdown?.show, false)
  dropdown.show = dropdownShow
  dropdownShow.state = useMemo(() => {
    return isFocused?.state || false
  }, [isFocused?.state])

  const placeholder = childrenBy.Placeholder.flatMap(
    (p) => p.props.children,
  ).reduce((acc, child) => `${acc} ${child?.toString()}`, ``) as string

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

  const nativeInputRef = useRef<Native.TextInput>(null)
  useEffect(() => {
    if (isFocused?.state) {
      nativeInputRef.current?.focus()
    } else {
      nativeInputRef.current?.blur()
    }
  }, [isFocused?.state])

  return (
    <InputContainer
      {...baseProps.taken}
      {...textProps.rest}
      style={[baseProps.taken.style, textProps.rest.style]}
      model={model}
      input={input}
      dropdown={dropdown}
      isFocused={isFocused}
      isInvalid={isInvalid}
    >
      <Native.TextInput
        ref={nativeInputRef}
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
          NativeInputStyle(theme, { isInvalid, invalid }),
          textProps.taken.style,
          baseProps.rest.style,
          isIos() && iosLineHeightFix,
        ]}
        onChangeText={onChangeText}
        onFocus={(e) => {
          isFocused.state = true
          onFocus?.(e)
        }}
        onBlur={(e) => {
          isFocused.state = false
          onBlur?.(e)
        }}
      />
      {childrenBy.Dropdown.map((child, i) => {
        return React.cloneElement(child as React.ReactElement<DropdownProps>, {
          key: i,
          onItemPress: (item: any) => {
            isFocused.state = false
            child.props.onItemPress?.(item)
          },
        })
      })}
      {childrenBy.others}
    </InputContainer>
  )
}
TextInput.Dropdown = InputBase.Dropdown
TextInput.Placeholder = InputBase.Placeholder

const InputContainer = themed<InputBaseProps>(InputBase, (p) => ({}))

const NativeInputStyle = createThemedStyle<Partial<TextInputProps>>((p) => ({
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
