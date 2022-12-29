import {
  BaseProps,
  hexLerp,
  ReactiveState,
  takeBaseOwnProps,
  takeTextOwnProps,
  useEnsureChildrenType,
  useExistingStateOr,
  useState,
} from '@proto-native'
import { Base } from '@proto-native/components/base'
import { isEmpty } from 'lodash-es'
import React, { FC, useEffect } from 'react'
import * as ReactNative from 'react-native'
import { FlattenInterpolation } from 'styled-components'
import styled, {
  css,
  DefaultTheme,
  ThemeProps,
  useTheme,
} from 'styled-components/native'
import {
  TextInputSuggestion,
  TextInputSuggestionProps,
} from './text-input-suggestion'

declare module '.' {
  export namespace TextInput {
    export let Suggestion: typeof TextInputSuggestion
  }
}

type TextInputSuggestion = React.ReactElement<TextInputSuggestionProps>

export type TextInputProps = BaseProps &
  ReactNative.TextInputProps & {
    model?: ReactiveState<string>
    focused?: {
      isFocused?: ReactiveState<boolean>
      style?: FlattenInterpolation<ThemeProps<DefaultTheme>>
    }
    suggestions?: {
      values?: TextInputSuggestion[]
      show?: ReactiveState<boolean>
      style?: FlattenInterpolation<ThemeProps<DefaultTheme>>
      focused?: {
        style?: FlattenInterpolation<ThemeProps<DefaultTheme>>
      }
    }
  }

export function TextInput(props: TextInputProps) {
  const theme = useTheme()
  let {
    children,
    focused,
    suggestions,
    onChangeText,
    numberOfLines,
    multiline,
    onKeyPress,
    onSubmitEditing,
    ...passed
  } = props
  numberOfLines ??= 1
  multiline ??= numberOfLines > 1
  const textProps = takeTextOwnProps(passed)
  const baseProps = takeBaseOwnProps(textProps.rest)

  useEnsureChildrenType(children, TextInputSuggestion)
  const model = useExistingStateOr(props.model, ``)
  if (!focused) focused = {}
  focused.isFocused = useExistingStateOr(focused?.isFocused, false)
  const showSuggestions = useState(suggestions?.show?.state ?? false)

  useEffect(() => {
    showSuggestions.state =
      focused!.isFocused!.state && !isEmpty(suggestions?.values)
  }, [suggestions?.values, focused!.isFocused!.state])

  const placeholder = React.Children.toArray(children).reduce(
    (acc, child) => `${acc} ${child.toString()}`,
    ``,
  ) as string

  const onChangeTextBase = (val: string) => {
    onChangeText?.(val)
    model.state = val
  }

  const onKeyPressBase = (
    e: ReactNative.NativeSyntheticEvent<ReactNative.TextInputKeyPressEventData>,
  ) => {
    onKeyPress?.(e)

    if (ReactNative.Platform.OS === `web`) {
      const event = e.nativeEvent as KeyboardEvent
      if (event.key === `Enter` && event.ctrlKey) {
        onSubmitEditing?.({
          ...e,
          nativeEvent: { ...e.nativeEvent, text: model.state },
        })
      }
    }
  }

  return (
    <TextInputBase {...baseProps.taken} {...textProps.rest}>
      <NativeInput
        focused={focused}
        model={model}
        suggestions={suggestions}
        placeholder={placeholder}
        onChangeText={onChangeTextBase}
        placeholderTextColor={theme.colors.text.primary}
        value={model.state}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onKeyPress={onKeyPressBase}
        onSubmitEditing={onSubmitEditing}
        {...textProps.taken}
        {...baseProps.rest}
        onFocus={(e) => {
          focused!.isFocused!.state = true
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          focused!.isFocused!.state = false
          props.onBlur?.(e)
        }}
      />
      <SuggestionsContainer showIf={showSuggestions.state}>
        {suggestions?.values?.map((suggestion, i) => (
          <Base
            key={i}
            onTouchEnd={() => {
              model.state = suggestion.props.children.toString()
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

const NativeOnSuggestions = css`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`

const NativeInput = styled(ReactNative.TextInput)<TextInputProps>`
  font-family: ${(p) => p.theme.typography.font.regular};
  color: ${(p) => p.theme.colors.text.primary};
  font-size: ${(p) => p.theme.typography.size.md};
  background-color: ${(p) => p.theme.colors.surface.sub};
  padding: 10px;
  border-radius: 8px;
  border: 2px solid transparent;
  outline-width: 0;

  ${(p) =>
  p.focused?.isFocused?.state && (p.focused?.style || NativeInputOnFocus)}
  ${(p) =>
    p.suggestions?.show?.state && (p.suggestions?.style || NativeOnSuggestions)}
` as FC<TextInputProps>

const SuggestionsContainer = styled(Base)`` as typeof Base
