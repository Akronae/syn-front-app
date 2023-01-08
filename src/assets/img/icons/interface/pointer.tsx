import { StyleProp, ViewStyle } from 'react-native'
import { Path, Svg } from 'react-native-svg'

type Props = {
  style?: StyleProp<ViewStyle>
}

export function Pointer(props: Props) {
  return (
    <Svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      style={props.style}
    >
      <Path
        d='M12.3542 6.76888C12.5492 6.96396 12.5492 7.28109 12.3542 7.47617C12.1591 7.67125 11.8419 7.67125 11.6469 7.47617C11.4518 7.28109 11.4518 6.96396 11.6469 6.76888C11.8419 6.57379 12.1581 6.57379 12.3542 6.76888'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M16.3118 7.2251V7.2251C16.3118 8.39659 15.7916 9.50605 14.8922 10.2564L13.4786 11.4349C12.9154 11.905 12.4942 12.5223 12.2621 13.2186L12 14.0009L11.7389 13.2176C11.5068 12.5223 11.0856 11.904 10.5224 11.4339L9.1088 10.2554C8.20843 9.50505 7.68921 8.39559 7.68921 7.2241V7.2241V7.24611C7.68821 4.55699 9.91614 2.99634 12 2.99634C14.0839 2.99634 16.3118 4.55699 16.3118 7.24711'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M5.99851 12C5.04511 12 4.22377 12.6733 4.03669 13.6087L3.03627 18.6108C2.78817 19.8483 3.73557 21.0037 4.99809 21.0037H19.0029C20.2654 21.0037 21.2128 19.8483 20.9647 18.6108L19.9643 13.6087C19.7772 12.6733 18.9559 12 18.0025 12'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
