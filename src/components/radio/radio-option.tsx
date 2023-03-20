import { Ionicons } from '@expo/vector-icons'
import { Base, BaseProps } from '@proto-native/components/base'
import { Text } from '@proto-native/components/text'
import { borderRadiusPercentToNumber, hexLerp } from '@proto-native/utils'
import { createThemedComponent } from '@proto-native/utils/theme/create-themed-component'
import * as Native from 'react-native'
import { RadioOptionDescription } from './radio-option-description'

export type RadioOptionProps<T = any> = BaseProps & {
  isSelected?: boolean
  value: T
  icon?: keyof typeof Ionicons.glyphMap
}

export function RadioOption<T>(props: RadioOptionProps<T>) {
  const { children, value: _, icon, ...passed } = props

  return (
    <RadioOptionBase {...passed} value={_}>
      <CircleOuter {...passed}>
        <CircleInner {...passed} />
      </CircleOuter>
      <RadioOptionText>
        {icon && <Icon name={icon} />}
        {children}
      </RadioOptionText>
    </RadioOptionBase>
  )
}
RadioOption.Description = RadioOptionDescription

const RadioOptionBase = createThemedComponent<RadioOptionProps>(Base, (p) => ({
  display: `flex`,
  flexDirection: `row`,
  backgroundColor: p.theme.protonative.colors.surface.sub,
  padding: 12,
  borderRadius: 8,
}))

const CircleOuter = createThemedComponent<{ isSelected?: boolean }>(
  Native.View,
  (p) => ({
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    height: p.theme.protonative.typography.size.sm,
    aspectRatio: `1 / 1`,
    marginRight: 15,
    marginTop: 2,
    borderRadius: borderRadiusPercentToNumber(50),
    backgroundColor: p.isSelected
      ? p.theme.protonative.colors.surface.primary
      : hexLerp(
        p.theme.protonative.colors.surface.sub,
        p.theme.protonative.colors.surface.contrast,
        0.1,
      ),
    borderWidth: 1,
    borderColor: `gray`,
  }),
)

const CircleInner = createThemedComponent<{ isSelected?: boolean }>(
  Native.View,
  (p) => ({
    height: `50%`,
    aspectRatio: `1 / 1`,
    borderRadius: borderRadiusPercentToNumber(50),
    backgroundColor: p.theme.protonative.colors.surface.default,
    opacity: p.isSelected ? 1 : 0,
  }),
)

const Icon = createThemedComponent(Ionicons, (p) => ({
  marginRight: 6,
  fontSize: p.theme.protonative.typography.size.sm,
}))

const RadioOptionText = createThemedComponent(Text, (p) => ({
  flexShrink: 1,
  fontSize: p.theme.protonative.typography.size.sm,
}))
