import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as React from 'react-native'
import { Base } from '~/components/Base'
import { RootStackParamList } from '~/router'

export type HomeProps = NativeStackScreenProps<RootStackParamList>

export function Home(props: HomeProps) {
  const { navigation } = props

  return <Base style={[styles.Home]}>
    <React.Button title='Acts' onPress={() => navigation.push(`ReadChapter`)}></React.Button>
  </Base>
}

const styles = React.StyleSheet.create({
  Home: {},
})

export const HomeStyles = styles
