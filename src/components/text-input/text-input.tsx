import {
  BaseProps,
  hexLerp,
  ReactiveState,
  takeBaseOwnProps,
  takeTextOwnProps,
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
import { TextInputSuggestionProps } from './text-input-suggestion'

export type TextInputProps = BaseProps &
  ReactNative.TextInputProps & {
    model?: ReactiveState<string>
    isFocused?: ReactiveState<boolean>
    focus?: {
      style?: FlattenInterpolation<ThemeProps<DefaultTheme>>
    }
    suggestions?: {
      values?: React.ReactElement<TextInputSuggestionProps>[]
      style?: FlattenInterpolation<ThemeProps<DefaultTheme>>
      show?: ReactiveState<boolean>
    }
  }

function TextInputBase(props: TextInputProps) {
  const theme = useTheme()
  const { children, suggestions, ...passed } = props
  const textProps = takeTextOwnProps(passed)
  const baseProps = takeBaseOwnProps(textProps.rest)

  const model = useExistingStateOr(props.model, ``)
  const isFocused = useExistingStateOr(props.isFocused, false)
  const showSuggestions = useState(false)

  useEffect(() => {
    showSuggestions.state = isFocused.state && !isEmpty(suggestions?.values)
  }, [suggestions?.values, isFocused.state])

  const placeholder = React.Children.toArray(children).reduce(
    (acc, child) => `${acc} ${child.toString()}`,
    ``,
  ) as string

  const onChangeText = (val: string) => {
    model.state = val
  }

  return (
    <Base {...baseProps.taken} {...textProps.rest}>
      <NativeInput
        isFocused={isFocused}
        model={model}
        suggestions={suggestions}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.primary}
        value={model.state}
        numberOfLines={1}
        {...textProps.taken}
        {...baseProps.rest}
        onFocus={(e) => {
          isFocused.state = true
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          isFocused.state = false
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
    </Base>
  )
}

export const TextInput = styled(TextInputBase)`` as typeof TextInputBase

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

  ${(p) => p.isFocused?.state && (p.onFocusStyle || NativeInputOnFocus)}
  ${(p) =>
  p.suggestions?.show?.state && (p.onSuggestionsStyle || NativeOnSuggestions)}
` as FC<TextInputProps>

const SuggestionsContainer = styled(Base)`` as typeof Base
