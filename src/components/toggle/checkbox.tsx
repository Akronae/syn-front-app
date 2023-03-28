import { Base, BaseProps } from '@proto-native/components/base'
import { ReactiveState, useExistingStateOr } from '@proto-native/utils'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'
import { Text } from '@proto-native/components/text'
import { Ionicons } from '@expo/vector-icons'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'

export type CheckboxProps = BaseProps & {
  model?: ReactiveState<boolean | null>
  mark?: {
    style?: ReturnType<ThemedStyle>
  }
}

export function Checkbox(props: CheckboxProps) {
  const {
    model: modelProps,
    onPress: onPressProps,
    children,
    mark,
    ...passed
  } = props

  const model = useExistingStateOr(modelProps, false)
  const onPress = (e: any) => {
    model.state = !model.state
    onPressProps?.(e)
  }

  return (
    <CheckboxBase {...passed} onPress={onPress}>
      <Markbox model={model} mark={mark}>
        <Mark model={model} name='remove-outline' />
      </Markbox>
      {children}
    </CheckboxBase>
  )
}
Checkbox.Label = themed(Text, (p) => ({
  fontSize: p.theme.protonative.typography.size.xs,
}))

const CheckboxBase = themed<BaseProps>(Base, (p) => ({
  display: `flex`,
  flexDirection: `row`,
  alignItems: `center`,
  gap: p.theme.protonative.spacing(2),
}))

const Markbox = themed<
  BaseProps & { model: CheckboxProps['model']; mark: CheckboxProps['mark'] }
>(Base, (p) => ({
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  width: 20,
  height: 20,
  borderRadius: 6,
  borderWidth: 2,
  borderColor: p.theme.protonative.colors.border.disabled,
  backgroundColor:
    p.model?.state === true
      ? p.theme.protonative.colors.surface.primary
      : undefined,
  ...p.mark?.style,
}))

const Mark = themed<{
  name: keyof typeof Ionicons.glyphMap
  model: CheckboxProps['model']
}>(Ionicons, (p) => ({
  display: p.model?.state == null ? `flex` : `none`,
  color: p.theme.protonative.colors.surface.contrast,
}))
