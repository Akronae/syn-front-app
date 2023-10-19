import {
  Base,
  BaseProps,
  takeBaseOwnProps,
} from '@proto-native/components/base'
import {
  boldnessToFont,
  getStyleBoldness,
  takeTextOwnProps,
} from '@proto-native/components/text'
import { useExistingStateOr, useGroupChildrenByType } from '@proto-native/utils'
import { isIos } from '@proto-native/utils/device/is-ios'
import { isWeb } from '@proto-native/utils/device/is-web'
import { themed } from '@proto-native/utils/theme/themed'
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import * as Native from 'react-native'
import { useTheme } from 'styled-components/native'
import {
  InputBase,
  InputBaseProps,
} from '@proto-native/components/input/input-base'
import { createThemedStyle } from '@proto-native/utils/theme/create-themed-style'
import { DropdownProps } from '@proto-native/components/dropdown'
import { Row } from '@proto-native/components/row'

export type InputTextType = 'text' | 'password' | 'email' | 'numeric'
export type InputTextProps<
  TSlotProps = any,
  TInputType = string,
> = InputBaseProps<TInputType, TSlotProps> & {
  type?: InputTextType
  inputFilter?: (input: string, old: string) => string
}

export type InputTextRef = Native.TextInput

export const InputText = forwardRef<InputTextRef, InputTextProps>(
  (props, ref) => {
    const theme = useTheme()
    let {
      children,
      type = `text`,
      inputFilter: inputFilterProps,
      isFocused: isFocusedProps,
      isInvalid: isInvalidProps,
      invalid,
      dropdown,
      onChangeText: onChangeTextProps,
      onFocus,
      onBlur,
      numberOfLines = 1,
      multiline,
      onKeyPress,
      onSubmitEditing,
      input,
      keyboardType,
      ...passed
    } = props
    multiline ??= numberOfLines > 1
    const inputFilter = inputFilterProps ?? getDefaultInputFilter(type)
    keyboardType ??= textInputTypeToKeyboard(type)

    const childrenBy = useGroupChildrenByType(children, {
      Placeholder: InputText.Placeholder,
      Dropdown: InputText.Dropdown,
      TopSlot: InputText.TopSlot,
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

    const placeholder = (
      childrenBy.Placeholder.flatMap((p) => p.props.children).reduce(
        (acc, child) => `${acc} ${child?.toString()}`,
        ``,
      ) as string
    ).trim()

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
      text = inputFilter(text, model.state)
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

    useImperativeHandle(ref, () => nativeInputRef.current as any)

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
        {childrenBy.TopSlot}
        <Row style={{ width: `100%` }}>
          <Native.TextInput
            ref={nativeInputRef}
            placeholder={placeholder}
            placeholderTextColor={theme.proto.colors.text.sub}
            value={model.state ?? ``}
            keyboardType={keyboardType}
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
          {childrenBy.others}
        </Row>
        {childrenBy.Dropdown.map((child, i) => {
          return React.cloneElement(
            child as React.ReactElement<DropdownProps>,
            {
              key: i,
              onItemPress: (item: any) => {
                isFocused.state = false
                child.props.onItemPress?.(item)
              },
            },
          )
        })}
      </InputContainer>
    )
  },
) as ForwardRefExoticComponent<
  InputTextProps & React.RefAttributes<InputTextRef>
> & {
  Dropdown: typeof InputBase.Dropdown
  Placeholder: typeof InputBase.Placeholder
  TopSlot: typeof Base
}
InputText.displayName = `InputText`
InputText.Dropdown = InputBase.Dropdown
InputText.Placeholder = InputBase.Placeholder
InputText.TopSlot = themed<BaseProps>(Base, (p) => ({})) as typeof Base

const InputContainer = themed<InputBaseProps>(InputBase, (p) => ({
  display: `flex`,
  flexDirection: `column`,
}))

const NativeInputStyle = createThemedStyle<Partial<InputTextProps>>((p) => ({
  flex: 1,
  ...(isWeb() && {
    outlineWidth: 0,
  }),
  fontFamily: boldnessToFont(
    getStyleBoldness(Native.StyleSheet.flatten(p.style)),
    p.theme,
  ),
  color: p.theme.proto.colors.text.primary,
  fontSize: p.theme.proto.typography.size.md,
  ...(p.isInvalid?.state && p.invalid?.style),
}))

function textInputTypeToKeyboard(type: InputTextType): Native.KeyboardType {
  switch (type) {
  case `email`:
    return `email-address`
  case `numeric`:
    return `numeric`
  case `password`:
    return `default`
  case `text`:
    return `default`
  }
}

function getDefaultInputFilter(
  type: InputTextType,
): NonNullable<InputTextProps['inputFilter']> {
  switch (type) {
  case `numeric`:
    return numericInputFilter
  default:
    return textInputFilter
  }
}

function textInputFilter(input: string): string {
  return input
}

function numericInputFilter(input: string): string {
  return input.replace(/[^0-9,.]/g, ``)
}
