import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils'
import { Text, TextProps } from '@proto-native/components/text'

export type SliderGradationProps = BaseProps & {
  val: React.ReactNode
}
export function SliderGradation(props: SliderGradationProps) {
  const { val, ...rest } = props
  return (
    <GraduationWrapper {...rest}>
      <GraduationMark />
      <GradutionText>{val}</GradutionText>
    </GraduationWrapper>
  )
}

const GraduationWrapper = themed<BaseProps>(Base, (p) => ({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
  position: `absolute`,
}))

const GraduationMark = themed<BaseProps>(Base, (p) => ({
  width: 1,
  height: 4,
  backgroundColor: p.theme.proto.colors.border.disabled,
}))

const GradutionText = themed<TextProps>(Text, (p) => ({
  marginTop: 4,
  fontSize: 14,
}))
