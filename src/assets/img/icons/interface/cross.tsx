import { StyleProp, ViewStyle } from 'react-native'
import { Path, Svg } from 'react-native-svg'

type Props = {
  style?: StyleProp<ViewStyle>
}

export function Cross(props: Props) {
  return (
    <Svg width={24} height={24} fill='none' {...props}>
      <Path
        d='m15 9-6 6M15 15 9 9'
        strokeWidth={2.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
