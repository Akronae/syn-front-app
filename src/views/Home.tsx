import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import * as React from 'react-native'
import { Base } from '~/components/Base'
import { RootStackParamList } from '~/router'

export type HomeProps = BottomTabScreenProps<RootStackParamList, `Home`> & {navigation: any, route: any}

export function Home(props: HomeProps) {

  return <Base style={[styles.Home]}>
  </Base>
}

const styles = React.StyleSheet.create({
  Home: {},
})

export const HomeStyles = styles
