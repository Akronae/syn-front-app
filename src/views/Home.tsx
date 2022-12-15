import { Base } from '@proto-native/base'
import { Text } from '@proto-native/text'
import { View } from '@proto-native/view'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import * as React from 'react'
import { Button } from '@proto-native/Button'
import { useAsync } from '@proto-native/use-async'
import { RootStackParamList } from 'src/router'
import ReadStorage from 'src/storage/ReadStorage'
import styled from 'styled-components/native'

export type HomeProps = BottomTabScreenProps<RootStackParamList, `Home`>

export function Home(props: HomeProps) {
  const a = useAsync(async () => await ReadStorage.get())
  console.log(a)

  return (
    <HomeBase>
      <Card showIf={a.value}>
        <Text>Get back where you left</Text>
        <Button
          onPress={() => props.navigation.navigate(`Read`, {})}
          icon='chevron-forward'
        >
          {a.value?.book} {a.value?.chapter}
        </Button>
      </Card>
    </HomeBase>
  )
}

const HomeBase = styled(Base)`
  padding: 10px;
`

const Card = styled(View)`
  background-color: ${({ theme }) => `#122447`};
  border: 1px solid #1e4894;
  border-radius: 16px;
  padding: 20px;
`
