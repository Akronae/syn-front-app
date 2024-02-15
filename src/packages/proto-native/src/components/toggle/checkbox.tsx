import { Base, BaseProps } from '@proto-native/components/base'
import { ReactiveState, useExistingStateOr } from '@proto-native/utils'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'
import { Text } from '@proto-native/components/text'
import { Ionicons } from '@expo/vector-icons'
import { ThemedStyle } from '@proto-native/utils/theme/themed-style'

export const CheckboxContext = React.createContext<CheckboxProps | null>(null)

export type CheckboxProps = BaseProps & {
  model?: ReactiveState<boolean | null>
  markbox?: {
    style?: ReturnType<ThemedStyle>
    mark?: {
      custom?: React.ComponentType<Partial<CheckboxProps>>
      ionicons?: keyof (typeof Ionicons)[`glyphMap`]
    }
  }
}

export function Checkbox(props: CheckboxProps) {
  const {
    model: modelProps,
    onTouchEnd: onTouchEndProps,
    children,
    markbox,
    ...passed
  } = props

  const model = useExistingStateOr(modelProps, false)
  const onTouchEnd = (e: any) => {
    model.state = !model.state
    onTouchEndProps?.(e)
  }

  return (
    <CheckboxContext.Provider value={{ ...props, model, onTouchEnd }}>
      <CheckboxBase {...passed} onTouchEnd={onTouchEnd}>
        <Markbox model={model} markbox={markbox}>
          {markbox?.mark?.custom ? (
            <markbox.mark.custom model={model} />
          ) : (
            <Mark
              model={model}
              name={markbox?.mark?.ionicons ?? `remove-outline`}
            />
          )}
        </Markbox>
        {children}
      </CheckboxBase>
    </CheckboxContext.Provider>
  )
}
Checkbox.Label = themed(Text, (p) => ({
  fontSize: p.theme.proto.typography.size.xs,
  flex: 1,
}))

const CheckboxBase = themed<BaseProps>(Base, (p) => ({
  display: `flex`,
  flexDirection: `row`,
  alignItems: `center`,
  gap: p.theme.proto.spacing(2),
}))

const Markbox = themed<
  BaseProps & {
    model: CheckboxProps['model']
    markbox: CheckboxProps['markbox']
  }
>(Base, (p) => ({
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  width: 20,
  height: 20,
  borderRadius: 6,
  borderWidth: 2,
  borderColor: p.theme.proto.colors.border.disabled,
  backgroundColor:
    p.model?.state === true ? p.theme.proto.colors.surface.primary : undefined,
  ...p.markbox?.style,
}))

const Mark = themed<{
  name: keyof typeof Ionicons.glyphMap
  model: CheckboxProps['model']
}>(Ionicons, (p) => ({
  display: p.model?.state == null ? `flex` : `none`,
  color: p.theme.proto.colors.surface.contrast,
}))
