import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

type Props = {
  style?: StyleProp<ViewStyle>
}

export function Link(props: Props) {
  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <Path
        d='M9 15L16 8'
        stroke='#1F1F1F'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M16 8V12V8H12'
        stroke='#1F1F1F'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19 20.001H5C3.895 20.001 3 19.106 3 18.001V6.00098C3 4.89598 3.895 4.00098 5 4.00098H19C20.105 4.00098 21 4.89598 21 6.00098V18.001C21 19.106 20.105 20.001 19 20.001Z'
        stroke='#1F1F1F'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
