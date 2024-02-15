import * as React from 'react-native'
import { range } from 'lodash-es'
import {
  InputText,
  InputTextProps,
  InputTextRef,
} from '@proto-native/components/input/input-text'
import { useEffect, useRef } from 'react'
import { InputBaseProps } from '@proto-native/components/input/input-base'
import {
  isBlank,
  themed,
  useExistingStateOr,
  useState,
} from '@proto-native/utils'
import { useFormField } from '@proto-native/components/form'
import { Base } from '@proto-native/components/base'

export type InputPinCodeSize = 'sm' | 'md'
export type InputPinCodeContrast = 'contrasted' | 'uncontrasted'
export type InputPinCodeState = 'default' | 'danger' | 'disabled'
export type InputPinCodeVariant = {
  size: InputPinCodeSize
  contrast: InputPinCodeContrast
  state: InputPinCodeState
}
export type InputPinCodeProps = InputBaseProps &
  Partial<InputPinCodeVariant> & {
    length?: number
    onFilled?: (value: string) => void
    pin?: {
      style?: React.StyleProp<React.ViewStyle & React.TextStyle>
    }
  }

export function InputPinCode(props: InputPinCodeProps) {
  const {
    length = 4,
    model: modelProps,
    size,
    contrast,
    state,
    onFilled,
    pin,
    onSubmitEditing,
    ...passed
  } = props
  const model = useExistingStateOr<string | undefined>(modelProps, undefined)
  const formField = useFormField()
  if (formField) formField.input = model
  const refs = range(length).map((_) => useRef<InputTextRef>(null))
  const models = range(length).map((_) => useState(``))
  const modelsJoined = models.map((m) => m.state).join(``)
  const lastFilled = useRef(``)

  useEffect(() => {
    model.state = modelsJoined
  }, [modelsJoined])

  if (model.state?.length == length) {
    if (model.state != lastFilled.current) {
      lastFilled.current = model.state
      setImmediate(() => onFilled?.(model.state!))
    }
  }

  const variant: InputPinCodeVariant = {
    size: size || `md`,
    contrast: contrast || `uncontrasted`,
    state: state || `default`,
  }

  return (
    <InputPinCodeBase {...passed} {...variant}>
      {range(length).map((i) => (
        <Pin
          key={i}
          model={models[i]}
          autoFocus={i == 0}
          onChangeText={(data) => {
            if (isBlank(data)) return
            data.split(``).forEach((d, j) => {
              refs[i + j]?.current?.focus()
              models[i + j]?.setter(d)
            })
            const next = refs[i + 1]?.current
            next?.focus()
            if (!next) {
              refs.forEach((r) => r.current?.blur())
            }
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key == `Backspace`) {
              // why? idk
              const target = refs[i].current as InputTextProps | null
              if (target?.value) return
              const prev = refs[i - 1]?.current
              setTimeout(() => {
                prev?.focus()
              }, 100)
            }
          }}
          bindFormField={false}
          ref={refs[i]}
          selectTextOnFocus={true}
          inputMode='numeric'
          style={pin?.style}
          onSubmitEditing={onSubmitEditing}
          {...variant}
        />
      ))}
    </InputPinCodeBase>
  )
}

const InputPinCodeBase = themed<InputPinCodeVariant>(Base, (p) => ({
  display: `flex`,
  flexDirection: `row`,
  gap: 10,
}))

const Pin = themed<InputTextProps & InputPinCodeVariant>(InputText, (p) => ({
  flex: 1,
  aspectRatio: 1,
  fontSize: 30,
  overflow: `hidden`,
  textAlign: `center`,
})) as typeof InputText
