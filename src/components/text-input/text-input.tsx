import { Ionicons } from '@expo/vector-icons'
import {
  hexLerp,
  ReactiveState,
  useChildrenByType,
  useExistingStateOr,
  useState,
} from '@proto-native/utils'
import {
  BaseProps,
  takeBaseOwnProps,
} from '@proto-native/components/base'
import {
  takeTextOwnProps,
} from '@proto-native/components/text'
import { Base } from '@proto-native/components/base'
import { isEmpty } from 'lodash-es'
import React, { useEffect } from 'react'
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

type TextInputSuggestion = React.ReactElement<TextInputSuggestionProps>

export type TextInputProps = BaseProps &
  ReactNative.TextInputProps & {
    model?: ReactiveState<string>
    focused?: {
      style?: FlattenInterpolation<ThemeProps<DefaultTheme>>
    }
    isFocused?: ReactiveState<boolean>
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
    icon?: keyof typeof Ionicons['glyphMap']
    rightSlot?: React.ReactNode
  }

export function TextInput(props: TextInputProps) {
  const theme = useTheme()
  let {
    children,
    focused: focusedProps,
    isFocused: isFocusedProps,
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

  if (!suggestions) suggestions = {}
  if (!suggestions.style) suggestions.style = NativeInputOnSuggestions
  const showSuggestions = useState(suggestions?.show?.state ?? false)
  const { taken: suggestionElems, left: childrenFiltered } = useChildrenByType(
    children,
    TextInputSuggestion,
  )

  useEffect(() => {
    showSuggestions.state =
      (isFocused?.state || false) && !isEmpty(suggestionElems)
  }, [suggestionElems, isFocused.state])

  const placeholder = childrenFiltered.reduce(
    (acc, child) => `${acc} ${child?.toString()}`,
    ``,
  ) as string

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
      <InputContainer
        focused={focused}
        isFocused={isFocused}
        suggestions={suggestions}
        input={input}
      >
        {icon && <Icon name={icon} />}
        <NativeInput
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.primary}
          value={model.state}
          numberOfLines={numberOfLines}
          multiline={multiline}
          onKeyPress={onKeyPressBase}
          onSubmitEditing={onSubmitEditing}
          {...textProps.taken}
          {...baseProps.rest}
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

const TextInputBase = styled(Base)`
  border-radius: 8px;
` as typeof Base

const NativeInputOnFocus = css`
  border-color: ${(p) =>
    hexLerp(p.theme.colors.surface.sub, p.theme.colors.surface.contrast, 0.05)};
`

const NativeInputOnSuggestions = css`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`

const InputContainer = styled(Base)<TextInputProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: ${(p) => p.theme.typography.font.regular};
  color: ${(p) => p.theme.colors.text.primary};
  font-size: ${(p) => p.theme.typography.size.md};
  background-color: ${(p) => p.theme.colors.surface.sub};
  padding: 10px;
  /* border-radius: inherit; */
  border: 2px solid transparent;

  ${(p) => p.isFocused?.state && p.focused?.style}
  ${(p) => p.suggestions?.show?.state && p.suggestions?.style}
  ${(p) => p.input?.style}
` as typeof Base

const NativeInput = styled(ReactNative.TextInput)`
  outline-width: 0;
  width: 100%;
  /* color: inherit; */
  /* font-size: inherit; */
  /* font-family: inherit; */
` as any as typeof ReactNative.TextInput

const SuggestionsContainer = styled(Base)<{
  suggestions: TextInputProps['suggestions']
}>`
  background-color: ${(props) => props.theme.colors.surface.sub};
  ${(p) => p.suggestions?.container?.style}
`

const Icon = styled(Ionicons)`
  margin-right: ${(p) => p.theme.spacing.two};
  /* color: inherit; */
  /* font-size: inherit; */
` as any as typeof Ionicons
