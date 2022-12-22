import { Base, BaseProps, takeBaseOwnProps } from '@proto-native/base'
import { ReactiveState } from '@proto-native/reactive-state'
import { takeTextOwnProps } from '@proto-native/text'
import React from 'react'
import * as ReactNative from 'react-native'
import styled, { useTheme } from 'styled-components/native'

export type TextInputProps = BaseProps &
  ReactNative.TextInputProps & {
    model?: ReactiveState<string>
  }

function TextInputBase(props: TextInputProps) {
  const theme = useTheme()
  const {children, ...passed} = props
  const textProps = takeTextOwnProps(passed)
  const baseProps = takeBaseOwnProps(textProps.rest)

  const firstChild = React.Children.toArray(children)?.[0]
  const placeholder = typeof firstChild === 'string' ? firstChild : undefined

  const onTextChange = (val: string) => {
    if (val && props.model) props.model.state = val
  }

  return (
    <Base {...baseProps.taken} {...textProps.rest}>
      <NativeInput
        placeholderTextColor={theme.colors.text.primary}
        onChangeText={onTextChange}
        value={props.model?.state}
        numberOfLines={1}
        placeholder={placeholder}
        {...textProps.taken}
        {...baseProps.rest}
      />
    </Base>
  )
}

export const TextInput = styled(TextInputBase)`` as typeof TextInputBase

const NativeInput = styled(ReactNative.TextInput)`
  font-family: ${(p) => p.theme.typography.font.regular};
  color: ${(p) => p.theme.colors.text.primary};
  font-size: ${(p) => p.theme.typography.size.md};
`
