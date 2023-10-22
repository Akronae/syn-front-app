// @ts-nocheck
import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const SvgArrangeFilterSort = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
    <Path
      d='M10.25 9.14286L7.625 7L5 9.14286'
      stroke={props?.style?.stroke || `#1F1F1F`}
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={undefined}
    />
    <Path
      d='M7.625 17V7'
      stroke={props?.style?.stroke || `#1F1F1F`}
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={undefined}
    />
    <Path
      d='M13.75 14.8574L16.375 17.0002L19 14.8574'
      stroke={props?.style?.stroke || `#1F1F1F`}
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={undefined}
    />
    <Path
      d='M16.375 7V17'
      stroke={props?.style?.stroke || `#1F1F1F`}
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={undefined}
    />
  </Svg>
)
export default SvgArrangeFilterSort
