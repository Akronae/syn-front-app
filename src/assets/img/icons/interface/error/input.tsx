import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const Input = (props: any) => (
  <Svg
    width={24}
    height={24}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.424 13.584H3.317A2.316 2.316 0 0 1 1 11.267v-6.95A2.317 2.317 0 0 1 3.317 2h16.218a2.316 2.316 0 0 1 2.317 2.317v8.107'
      fill='#D1CDC7'
    />
    <Path
      d='M17.423 7.588a.29.29 0 1 1-.41.41.29.29 0 0 1 .41-.41M11.63 7.588a.29.29 0 1 1-.409.41.29.29 0 0 1 .41-.41M5.839 7.588a.29.29 0 1 1-.41.41.29.29 0 0 1 .41-.41'
      stroke='#4E4941'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.218 21.694a5.792 5.792 0 1 1 0-11.585 5.792 5.792 0 0 1 0 11.585Z'
      fill='#FD0D0D'
    />
    <Path
      d='M17.218 18.102a.057.057 0 0 0-.057.058v0a.058.058 0 1 0 .058-.058h0M17.218 15.687V13.56'
      stroke='#fff'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
)

export default Input
