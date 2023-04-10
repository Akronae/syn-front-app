import { BaseProps, Text, View } from '@proto-native'
import * as React from 'react-native'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export type MenuBarProps = BaseProps

export function MenuBar(props: MenuBarProps) {
  const { ...passed } = props
  const router = useRouter()

  return (
    <MenuBarBase {...passed}>
      <Item onPress={() => router.back()}>
        <Icon name='arrow-back' size={20} />
        <ItemName>Back</ItemName>
      </Item>
      <Item onPress={() => router.push(`/`)}>
        <Icon name='home' size={20} />
        <ItemName>Home</ItemName>
      </Item>
    </MenuBarBase>
  )
}

const MenuBarBase = themed(View, (p) => ({
  flexDirection: `row`,
  justifyContent: `space-evenly`,
  padding: 10,
  borderTopColor: p.theme.syn.colors.border.disabled,
  borderTopWidth: 1,
})) as typeof View

const Item = themed(View, (p) => ({
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
})) as typeof View

const Icon = themed(Ionicons, (p) => ({
  color: p.theme.syn.colors.text.primary,
})) as typeof Ionicons

const ItemName = themed(Text, (p) => ({
  color: p.theme.syn.colors.text.primary,
  fontSize: p.theme.syn.typography.size.xxs,
}))
