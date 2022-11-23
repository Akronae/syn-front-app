import { Base } from '@proto-native/base'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import * as React from 'react-native'
import { RootStackParamList } from 'src/router'

export type HomeProps = BottomTabScreenProps<RootStackParamList, `Home`> & {
  navigation: any
  route: any
}

export function Home(props: HomeProps) {
  return <Base style={[styles.Home]}></Base>
}

const styles = React.StyleSheet.create({
  Home: {},
})

export const HomeStyles = styles
