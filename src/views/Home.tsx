import { Button, ButtonPressAnimation } from '@proto-native/Button'
import { Base } from '@proto-native/base'
import { Text } from '@proto-native/text'
import { useAsync } from '@proto-native/use-async'
import { View } from '@proto-native/view'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import * as React from 'react'
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
        <Btn
          onTouchEnd={() => props.navigation.navigate(`Read`, {})}
          icon='chevron-forward'
          pressAnimation={ButtonPressAnimation.ScaleDown}
        >
          {a.value?.book} {a.value?.chapter}
        </Btn>
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

const Btn = styled(Button)`
  background-color: #1e4894;
` as typeof Button
