import { BaseProps, Text, View, useGroupChildrenByType } from '@proto-native'
import * as React from 'react-native'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'
import { Title } from './title'

export type CardProps = BaseProps

export function Card(props: CardProps) {
  const { children, ...passed } = props
  const childrenBy = useGroupChildrenByType(children, { Title: Card.Title })

  return (
    <CardBase {...passed}>
      <Title size='h5'>{childrenBy.Title}</Title>
      {childrenBy.others}
    </CardBase>
  )
}
Card.Title = themed(React.Text, (p) => ({}))
Card.Description = themed(Text, (p) => ({
  fontSize: p.theme.syn.typography.size.xs,
}))

const CardBase = themed(View, (p) => ({
  flexDirection: `column`,
  backgroundColor: p.theme.syn.colors.surface.sub,
  padding: p.theme.syn.spacing(4),
  borderRadius: p.theme.syn.borderRadius(4),
}))
