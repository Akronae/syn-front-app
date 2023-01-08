import { StyleProp, ViewStyle } from 'react-native'
import { Path, Svg } from 'react-native-svg'

type Props = {
  style?: StyleProp<ViewStyle>
}

export function AddBank(props: Props) {
  return (
    <Svg width={24} height={24} fill='none' {...props}>
      <Path
        d='M14 20.003h8.004v-1l-1-2.001H14M6.498 12a4.502 4.502 0 1 1 0 9.004 4.502 4.502 0 0 1 0-9.004M4.997 16.502h3.001M6.498 18.002v-3.001M20.003 17.002V8.999M15.645 8.999v8.003'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        clipRule='evenodd'
        d='M3.997 8.999h18.007V5.925L13 1.995l-9.003 3.93V9Z'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
