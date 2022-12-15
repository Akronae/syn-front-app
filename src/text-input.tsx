import { Base, BaseProps, takeBaseOwnProps } from '@proto-native/base'
import { ReactiveState } from '@proto-native/reactive-state'
import * as ReactNative from 'react-native'
import { takeTextOwnProps } from '@proto-native/text'
import styled, { useTheme } from 'styled-components/native'

export type TextInputProps = BaseProps &
  ReactNative.TextInputProps & {
    model?: ReactiveState<string>
  }

function TextInputBase(props: TextInputProps) {
  const theme = useTheme()
  const {taken: textTaken, rest: textRest} = takeTextOwnProps(props)
  const {taken: baseTaken, rest: baseRest} = takeBaseOwnProps(textRest)

  const onTextChange = (val: string) => {
    if (val && props.model) props.model.state = val
  }

  return (
    <Base {...baseTaken} {...textRest}>
      <NativeInput placeholderTextColor={theme.colors.text.primary}
        onChangeText={onTextChange}
        value={props.model?.state}
        numberOfLines={1}
        {...textTaken}
        {...baseRest}
      />
    </Base>
  )
}

export const TextInput = styled(TextInputBase)`
` as typeof TextInputBase

const NativeInput = styled(ReactNative.TextInput)`
  font-family: ${p => p.theme.typography.font.regular};
  color: ${p => p.theme.colors.text.primary};
  font-size: ${p => p.theme.typography.size.md};
`
