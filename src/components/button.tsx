import * as Proto from '@proto-native'

export type ButtonProps = Proto.ButtonProps

export function Button(props: ButtonProps) {
  const { ...passed } = props

  return <ButtonBase pressAnimation={`scale-down`} {...passed}></ButtonBase>
}

const ButtonBase = Proto.themed(Proto.Button, (p) => ({}))
