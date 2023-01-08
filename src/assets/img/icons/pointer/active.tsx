import { StyleProp, ViewStyle } from 'react-native'
import { Ellipse, Path, Svg } from 'react-native-svg'

type Props = {
  style?: StyleProp<ViewStyle>
}

export function Active(props: Props) {
  return (
    <Svg width='40' height='40' viewBox='0 0 32 32' fill='none'>
      <Ellipse
        id='Ellipse'
        cx='16.5'
        cy='29'
        rx='9.5'
        ry='3'
        fill='#18120140'
        fillOpacity='0.3'
      />
      <Path
        id='Vector'
        d='M16.4 0C10.6562 0 6 4.73299 6 10.5714C6 19.0286 14.5091 29.6 16.4 29.6C18.2909 29.6 26.8 19.0286 26.8 10.5714C26.8 4.73299 22.1438 0 16.4 0Z'
        fill='#1F1F1F'
      />
      <Path
        id='Icon_blanc'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.1308 14.1725L19.9687 9.98136H16.1794L12.4357 13.6332V9.70579C12.4357 7.39478 14.2568 5.51469 16.4951 5.51469C18.7336 5.51469 20.5547 7.39478 20.5547 9.70579L20.5617 15.8453H17.0616L15.1308 14.1725ZM10 9.70579V18.0842C10 18.2385 10.1212 18.3636 10.2706 18.3636H12.1651C12.3146 18.3636 12.4357 18.2385 12.4357 18.0842V14.7118L16.1794 18.3636H19.9687L19.9644 18.3599H20.8349H21.71H22.7294C22.8788 18.3599 23 18.2348 23 18.0805L22.9903 9.70579C22.9903 6.00234 20.0823 3 16.4951 3C12.908 3 10 6.00234 10 9.70579Z'
        fill='white'
      />
    </Svg>
  )
}
