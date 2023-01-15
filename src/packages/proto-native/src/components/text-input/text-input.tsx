import {
  TextInputSuggestion,
  TextInputSuggestionProps,
} from './text-input-suggestion'
import { Ionicons } from '@expo/vector-icons'
import {
  Base,
  BaseProps,
  takeBaseOwnProps,
} from '@proto-native/components/base'
import { FormFieldState, useFormField } from '@proto-native/components/form'
import { takeTextOwnProps } from '@proto-native/components/text'
import {
  hexLerp,
  ReactiveState,
  useChildrenByType,
  useExistingStateOr,
  useState,
} from '@proto-native/utils'
import { isEmpty, isUndefined, omitBy } from 'lodash-es'
import React from 'react'
import * as Native from 'react-native'
import { FlattenInterpolation } from 'styled-components'
import styled, {
  css,
  DefaultTheme,
  ThemeProps,
  useTheme,
} from 'styled-components/native'

type TextInputSuggestion = React.ReactElement<TextInputSuggestionProps>

export type TextInputProps = BaseProps &
  Native.TextInputProps & {
    model?: ReactiveState<string>
    focused?: {
      style?: FlattenInterpolation<ThemeProps<DefaultTheme>>
    }
    isFocused?: ReactiveState<boolean>
    isInvalid?: ReactiveState<boolean>
    invalid?: {
      style?: FlattenInterpolation<ThemeProps<DefaultTheme>>
    }
    suggestions?: {
      show?: ReactiveState<boolean>
      style?: FlattenInterpolation<ThemeProps<DefaultTheme>>
      container?: {
        style?: FlattenInterpolation<ThemeProps<DefaultTheme>>
      }
      focused?: {
        style?: FlattenInterpolation<ThemeProps<DefaultTheme>>
      }
    }
    input?: {
      style?: FlattenInterpolation<ThemeProps<DefaultTheme>>
    }
    icon?: {
      ionicons?: keyof typeof Ionicons[`glyphMap`]
      custom?: React.ComponentType<Partial<TextInputProps>>
    }
    rightSlot?: React.ReactNode
  }

export function TextInput(props: TextInputProps) {
  const theme = useTheme()
  let {
    children,
    focused: focusedProps,
    isFocused: isFocusedProps,
    isInvalid: isInvalidProps,
    invalid,
    suggestions,
    onChangeText,
    onFocus,
    onBlur,
    numberOfLines,
    multiline,
    onKeyPress,
    onSubmitEditing,
    icon,
    rightSlot,
    input,
    style: styleProps,
    ...passed
  } = props
  numberOfLines ??= 1
  multiline ??= numberOfLines > 1
  const textProps = takeTextOwnProps(passed)
  const baseProps = takeBaseOwnProps(textProps.rest)

  const model = useExistingStateOr(props.model, ``)
  const focused = focusedProps ?? {}
  if (!focused.style) focused.style = NativeInputOnFocus
  const isFocused = useExistingStateOr(isFocusedProps, false)

  const isInvalid = useExistingStateOr(isInvalidProps, false)
  invalid ??= {}
  invalid.style ??= NativeInputOnInvalid

  const formField = useFormField()
  if (formField) {
    formField.input = model
  }
  if (formField?.state.state === FormFieldState.Error) isInvalid.state = true

  if (!suggestions) suggestions = {}
  if (!suggestions.style) suggestions.style = NativeInputOnSuggestions
  const showSuggestions = useState(suggestions?.show?.state ?? false)
  const { taken: suggestionElems, left: childrenFiltered } = useChildrenByType(
    children,
    TextInputSuggestion,
  )

  showSuggestions.state =
    (isFocused?.state || false) && !isEmpty(suggestionElems)

  const placeholder = childrenFiltered.reduce(
    (acc, child) => `${acc} ${child?.toString()}`,
    ``,
  ) as string

  const onKeyPressBase = (
    e: Native.NativeSyntheticEvent<Native.TextInputKeyPressEventData>,
  ) => {
    onKeyPress?.(e)

    if (Native.Platform.OS === `web`) {
      const event = e.nativeEvent as KeyboardEvent
      if (event.key === `Enter` && event.ctrlKey) {
        onSubmitEditing?.({
          ...e,
          nativeEvent: { ...e.nativeEvent, text: model.state },
        })
      }
    }
  }

  const style =
    Native.StyleSheet.flatten([styleProps, textProps.taken.style]) ?? {}

  return (
    <TextInputBase {...baseProps.taken} {...textProps.rest}>
      <InputContainer
        focused={focused}
        isFocused={isFocused}
        invalid={invalid}
        isInvalid={isInvalid}
        suggestions={suggestions}
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
        <NativeInput
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.sub}
          value={model.state}
          numberOfLines={numberOfLines}
          multiline={multiline}
          onKeyPress={onKeyPressBase}
          onSubmitEditing={onSubmitEditing}
          isInvalid={isInvalid}
          invalid={invalid}
          {...textProps.taken}
          {...baseProps.rest}
          style={style}
          onChangeText={(val) => {
            model.state = val
            onChangeText?.(val)
          }}
          onFocus={(e) => {
            if (isFocused) isFocused.state = true
            onFocus?.(e)
          }}
          onBlur={(e) => {
            if (isFocused) isFocused.state = false
            onBlur?.(e)
          }}
        />
        {rightSlot}
      </InputContainer>
      <SuggestionsContainer
        showIf={showSuggestions.state}
        suggestions={suggestions}
      >
        {suggestionElems.map((suggestion, i) => (
          <Base
            key={i}
            onTouchEnd={() => {
              if (suggestion.props.isDisabled) return
              model.state = suggestion.props.value
              showSuggestions.state = false
            }}
          >
            {suggestion}
          </Base>
        ))}
      </SuggestionsContainer>
    </TextInputBase>
  )
}

TextInput.Suggestion = TextInputSuggestion

const TextInputBase = styled(Base)`` as typeof Base

const NativeInputOnFocus = css`
  border-color: ${(p) =>
    hexLerp(p.theme.colors.surface.sub, p.theme.colors.surface.contrast, 0.05)};
`

const NativeInputOnInvalid = css`
  border-color: ${(p) => p.theme.colors.surface.error};
  color: ${(p) => p.theme.colors.surface.error};
`

const NativeInputOnSuggestions = css`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`

const InputContainer = styled(Base)<Partial<TextInputProps>>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(p) => p.theme.colors.surface.sub};
  padding: 10px;
  border-radius: 8px;
  border: 2px solid transparent;

  ${(p) => p.isFocused?.state && p.focused?.style}
  ${(p) => p.isInvalid?.state && p.invalid?.style}
  ${(p) => p.suggestions?.show?.state && p.suggestions?.style}
  ${(p) => p.input?.style}
`

const NativeInput = styled(Native.TextInput)<Partial<TextInputProps>>`
  outline-width: 0;
  flex: 1;
  font-family: ${(p) => p.theme.typography.font.regular};
  color: ${(p) => p.theme.colors.text.primary};
  font-size: ${(p) => p.theme.typography.size.md};
  ${(p) => p.isInvalid?.state && p.invalid?.style}
`

const SuggestionsContainer = styled(Base)<{
  suggestions: TextInputProps[`suggestions`]
}>`
  background-color: ${(props) => props.theme.colors.surface.sub};
  ${(p) => p.suggestions?.container?.style}
`

const Icon = styled(Ionicons)<Partial<TextInputProps>>`
  margin-right: ${(p) => p.theme.spacing.two};
  font-family: ${(p) => p.theme.typography.font.regular};
  color: ${(p) => p.theme.colors.text.primary};
  font-size: ${(p) => p.theme.typography.size.md};

  ${(p) => p.isInvalid?.state && p.invalid?.style}
`
