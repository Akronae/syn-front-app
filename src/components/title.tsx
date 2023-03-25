import {
  takeTextOwnProps,
  Text,
  TextProps,
  useGroupChildrenByType,
} from '@proto-native'
import * as React from 'react-native'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'

export type TitleSize = `h1` | `h2` | `h3` | `h4` | `h5` | `h6`
export type TitleVariant = {
  size: TitleSize
}
export type TitleProps = TextProps & Partial<TitleVariant>

export function Title(props: TitleProps) {
  const { size, children, ...passed } = props
  const textProps = takeTextOwnProps(passed)

  const childrenBy = useGroupChildrenByType(children, {
    Description: Title.Description,
  })

  const variant: TitleVariant = {
    size: size || `h2`,
  }

  return (
    <TitleBase {...textProps.rest}>
      <TitleText {...textProps.taken} {...variant}>
        {childrenBy.others}
      </TitleText>
      {childrenBy.Description}
    </TitleBase>
  )
}
Title.Description = themed(Text, (p) => ({
  fontSize: p.theme.syn.typography.size.md,
  fontWeight: `600`,
}))

const TitleBase = themed(Text, (p) => ({
  display: `flex`,
  flexDirection: `column`,
}))

const TitleText = themed<TextProps & TitleVariant>(Text, (p) => {
  const sizeToTypo = (size: TitleSize) => {
    switch (size) {
    case `h1`:
      return `xxl`
    case `h2`:
      return `xl`
    case `h3`:
      return `lg`
    case `h4`:
      return `md`
    case `h5`:
      return `sm`
    case `h6`:
    default:
      return `xs`
    }
  }
  return {
    fontSize: p.theme.syn.typography.size[sizeToTypo(p.size)],
    fontWeight: `800`,
    display: `flex`,
    flexDirection: `column`,
    color: p.theme.syn.colors.text.light,
  }
})
