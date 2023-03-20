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
  useState,
} from '@proto-native/utils'
import { isIos } from '@proto-native/utils/device/is-ios'
import { isWeb } from '@proto-native/utils/device/is-web'
import { createThemedComponent } from '@proto-native/utils/theme/create-themed-component'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'
import { isEmpty, isUndefined, omitBy } from 'lodash-es'
import React, { useEffect, useMemo } from 'react'
import * as Native from 'react-native'
import { useTheme } from 'styled-components/native'
import {
  TextInputSuggestion,
  TextInputSuggestionProps,
} from './text-input-suggestion'

type TextInputSuggestion = React.ReactElement<TextInputSuggestionProps>

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
  suggestions?: {
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
    custom?: React.ComponentType<Partial<TextInputProps>>
  }
  rightSlot?: <TProps extends TSlotProps>(props: TProps) => React.ReactNode
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

  const model = useExistingStateOr(props.model, ``)
  const focused = focusedProps ?? {}
  if (!focused.style) focused.style = NativeInputOnFocus({ theme })
  const isFocused = useExistingStateOr(isFocusedProps, false)

  const isInvalid = useExistingStateOr(isInvalidProps, false)
  invalid ??= {}
  invalid.style ??= NativeInputOnInvalid({ theme })

  const formField = useFormField()
  if (formField) {
    formField.input = model
  }
  useEffect(() => {
    isInvalid.state = formField?.state.state === FormFieldState.Error
  })

  if (!suggestions) suggestions = {}
  if (!suggestions.style)
    suggestions.style = NativeInputOnSuggestions({ theme })
  const showSuggestions = useState(suggestions?.show?.state ?? false)
  const { taken: suggestionElems, left: childrenFiltered } = useChildrenByType(
    children,
    TextInputSuggestion,
  )

  showSuggestions.state = useMemo(() => {
    return (isFocused?.state || false) && !isEmpty(suggestionElems)
  }, [isFocused?.state, suggestionElems])

  const placeholder = childrenFiltered.reduce(
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

  const style =
    Native.StyleSheet.flatten([props.style, textProps.taken.style]) ?? {}

  // https://github.com/facebook/react-native/issues/28012
  const lineHeightOverflow = (style.lineHeight ?? 0) - (style.fontSize ?? 0)
  const iosLineHeightFix = {
    paddingTop: lineHeightOverflow / 2,
    paddingBottom: lineHeightOverflow / 2,
    lineHeight: undefined,
  }

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
          style={[style, isIos() && iosLineHeightFix]}
          onChangeText={onChangeText}
          onFocus={(e) => {
            if (isFocused) isFocused.state = true
            onFocus?.(e)
          }}
          onBlur={(e) => {
            if (isFocused) isFocused.state = false
            onBlur?.(e)
          }}
        />
        {rightSlot?.(props)}
      </InputContainer>
      <SuggestionsContainer
        showIf={showSuggestions.state}
        suggestions={suggestions}
      >
        {suggestionElems.map((suggestion, i) => (
          <Base
            key={i}
            onTouchStart={() => {
              if (suggestion.props.isDisabled) return
              model.state = suggestion.props.value

              Native.Keyboard.dismiss()
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

const TextInputBase = Base

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

const NativeInputOnSuggestions: ThemedStyle = (p) => ({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
})

const InputContainer = createThemedComponent<Partial<TextInputProps>>(
  Base,
  (p) => ({
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
    ...(p.suggestions?.show?.state && p.suggestions?.style),
    ...p.input?.style,
  }),
)

const NativeInput = createThemedComponent<Partial<TextInputProps>>(
  Native.TextInput,
  (p) => ({
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
  }),
)

const SuggestionsContainer = createThemedComponent<
  {
    suggestions: TextInputProps[`suggestions`]
  } & BaseProps
>(Base, (p) => ({
  backgroundColor: p.theme.protonative.colors.surface.sub,
  ...p.suggestions?.container?.style,
}))

const Icon = createThemedComponent<Partial<TextInputProps> & { name: string }>(
  Ionicons,
  (p) => ({
    marginRight: p.theme.protonative.spacing(2),
    fontFamily: p.theme.protonative.typography.font.regular,
    color: p.theme.protonative.colors.text.primary,
    fontSize: p.theme.protonative.typography.size.md,
    ...(p.isInvalid?.state && p.invalid?.style),
  }),
)
