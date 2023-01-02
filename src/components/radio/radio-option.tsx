import { Ionicons } from '@expo/vector-icons'
import { hexLerp } from '@proto-native'
import { Base, BaseProps } from '@proto-native/components/base'
import { Text } from '@proto-native/components/text'
import * as React from 'react-native'
import styled from 'styled-components/native'
import { RadioOptionDescription } from './radio-option-description'

declare module '.' {
  // namespace RadioOption {
  // let Description: typeof RadioOptionDescription
  // }
}

export type RadioOptionProps<T = any> = BaseProps & {
  isSelected?: boolean
  value: T
  icon?: keyof typeof Ionicons.glyphMap
}

export function RadioOption<T>(props: RadioOptionProps<T>) {
  const { children, value: _, icon, ...passed } = props

  return (
    <RadioOptionBase {...passed}>
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

const RadioOptionBase = styled(Base)<RadioOptionProps>`
  display: flex;
  flex-direction: row;
  background-color: ${(p) => p.theme.colors.surface.sub};
  padding: 12px;
  border-radius: 8px;
` as typeof Base

const CircleOuter = styled.View<RadioOptionProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(p) => p.theme.typography.size.sm};
  aspect-ratio: 1 / 1;
  margin-right: 15px;
  margin-top: 2px;
  border-radius: 50%;
  background-color: ${(p) =>
    p.isSelected
      ? p.theme.colors.surface.primary
      : hexLerp(
        p.theme.colors.surface.sub,
        p.theme.colors.surface.contrast,
        0.1,
      )};
  border: 1px solid gray;
`

const CircleInner = styled.View<RadioOptionProps>`
  height: 50%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.surface.default};
  opacity: ${(props) => (props.isSelected ? 1 : 0)};
`

const Icon = styled(Ionicons)`
  margin-right: 6px;
  font-size: ${(p) => p.theme.typography.size.sm};
`

const RadioOptionText = styled(Text)`
  flex-shrink: 1;
  font-size: ${(p) => p.theme.typography.size.sm};
`
