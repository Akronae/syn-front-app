import { Base, BaseProps } from '@proto-native/components/base'
import { Text } from '@proto-native/components/text'
import { View } from '@proto-native/components/view'
import { isWeb } from '@proto-native/utils/device/is-web'
import { isDev } from '@proto-native/utils/env/is-dev'
import { useScreenAspectRatio } from '@proto-native/utils/use-screen-aspect-ratio'
import Constants from 'expo-constants'
import * as React from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg'
import styled from 'styled-components/native'

export type StatusBarProps = BaseProps

export function StatusBarMockup(props: StatusBarProps) {
  const { ...passed } = props
  const aspectRatio = useScreenAspectRatio()

  const isMobileWebViewDev = isDev() && isWeb() && aspectRatio < 1.1

  return (
    <StatusBarBase {...passed}>
      {isMobileWebViewDev && <Mockup />}
    </StatusBarBase>
  )
}

function Mockup() {
  return (
    <>
      <Time>
        {new Date().getHours()}:{new Date().getMinutes()}
      </Time>
      <Notch />
      <Icons gap={{ horizontal: 10 }}>
        <Battery />
        <Wifi />
        <Network />
      </Icons>
    </>
  )
}

const StatusBarBase = styled(Base)`
  height: ${React.StatusBar.currentHeight || Constants.statusBarHeight || 53};
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: ${(p) => p.theme.protonative.colors.text.contrast};
  fill: ${(p) => p.theme.protonative.colors.text.contrast};
  stroke: ${(p) => p.theme.protonative.colors.text.contrast};
` as typeof Base

const Time = styled(Text)`
  margin: 18px 0 13px 0;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  color: ${(p) => p.theme.protonative.colors.text.contrast};
`

const Icons = styled(View)`
  flex-direction: row;
  margin: 23px 0 18px 0;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Notch = styled(Base)`
  height: 37px;
  width: 125px;
  background-color: ${(p) => p.theme.protonative.colors.text.contrast};
  border-radius: 40px;
  margin: 11px 0 5px 0;
  flex: 1;
  justify-content: center;
  align-items: center;
`

function Battery() {
  return (
    <Svg width='28' height='14' viewBox='0 0 28 14'>
      <Rect
        opacity='0.35'
        x='0.700195'
        y='1.10001'
        width='24'
        height='12'
        rx='3.8'
      />
      <Path
        opacity='0.4'
        d='M26.1001 5.26666V9.26666C26.9048 8.92789 27.4281 8.1398 27.4281 7.26666C27.4281 6.39353 26.9048 5.60544 26.1001 5.26666Z'
      />
      <Rect x='2' y='2.60001' width='21' height='9' rx='2.5' />
    </Svg>
  )
}

function Wifi() {
  return (
    <Svg width='20' height='13' viewBox='0 0 20 13'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.9006 1.22501C19.9006 0.603686 19.4267 0.100006 18.8421 0.100006H17.7836C17.199 0.100006 16.725 0.603686 16.725 1.22501V10.975C16.725 11.5963 17.199 12.1 17.7836 12.1H18.8421C19.4267 12.1 19.9006 11.5963 19.9006 10.975V1.22501ZM12.524 2.50001H13.5826C14.1672 2.50001 14.6411 3.01577 14.6411 3.65201V10.948C14.6411 11.5842 14.1672 12.1 13.5826 12.1H12.524C11.9394 12.1 11.4655 11.5842 11.4655 10.948V3.65201C11.4655 3.01577 11.9394 2.50001 12.524 2.50001ZM8.22377 5.10001H7.16524C6.58064 5.10001 6.10672 5.62234 6.10672 6.26667V10.9333C6.10672 11.5777 6.58064 12.1 7.16524 12.1H8.22377C8.80837 12.1 9.28229 11.5777 9.28229 10.9333V6.26667C9.28229 5.62234 8.80837 5.10001 8.22377 5.10001ZM2.96421 7.50001H1.90569C1.32108 7.50001 0.847168 8.01488 0.847168 8.65001V10.95C0.847168 11.5851 1.32108 12.1 1.90569 12.1H2.96421C3.54882 12.1 4.02274 11.5851 4.02274 10.95V8.65001C4.02274 8.01488 3.54882 7.50001 2.96421 7.50001Z'
      />
    </Svg>
  )
}

function Network() {
  return (
    <Svg width='18' height='13' viewBox='0 0 18 13'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.84962 2.62062C11.3177 2.62072 13.6915 3.52573 15.4802 5.14859C15.6149 5.27388 15.8302 5.2723 15.9629 5.14505L17.2505 3.90498C17.3177 3.84044 17.3551 3.75301 17.3545 3.66204C17.354 3.57108 17.3155 3.48408 17.2475 3.42029C12.5526 -0.873413 5.14588 -0.873413 0.450981 3.42029C0.382972 3.48403 0.344385 3.57101 0.343758 3.66197C0.343131 3.75294 0.380515 3.84039 0.44764 3.90498L1.7356 5.14505C1.86817 5.27249 2.08364 5.27408 2.21826 5.14859C4.00723 3.52563 6.38125 2.62062 8.84962 2.62062ZM8.84785 6.76274C10.1948 6.76266 11.4937 7.26492 12.4921 8.17194C12.6272 8.30066 12.8399 8.29787 12.9716 8.16565L14.249 6.87077C14.3163 6.80285 14.3536 6.71071 14.3526 6.61497C14.3517 6.51922 14.3125 6.42786 14.2438 6.36133C11.2034 3.52402 6.49487 3.52402 3.45442 6.36133C3.38574 6.42786 3.34656 6.51927 3.34566 6.61504C3.34476 6.71082 3.38221 6.80295 3.44963 6.87077L4.72672 8.16565C4.85836 8.29787 5.07109 8.30066 5.20613 8.17194C6.20391 7.26552 7.50178 6.7633 8.84785 6.76274ZM11.3507 9.50456C11.3526 9.60796 11.3158 9.70765 11.249 9.78009L9.08897 12.1894C9.02565 12.2602 8.93932 12.3 8.84925 12.3C8.75917 12.3 8.67284 12.2602 8.60952 12.1894L6.44911 9.78009C6.38238 9.70759 6.34566 9.60787 6.34764 9.50447C6.34962 9.40107 6.39012 9.30316 6.45957 9.23385C7.83905 7.94429 9.85944 7.94429 11.2389 9.23385C11.3083 9.30321 11.3488 9.40116 11.3507 9.50456Z'
      />
    </Svg>
  )
}
