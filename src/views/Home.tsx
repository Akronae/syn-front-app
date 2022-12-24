import { Button, ButtonPressAnimation } from '@proto-native'
import { Base } from '@proto-native'
import { Text } from '@proto-native'
import { useAsync } from '@proto-native'
import { View } from '@proto-native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import * as React from 'react'
import { useOnRouteEnter } from 'src/packages/proto-native/src/utils/react-navigation/onRouteEnter'
import { RootStackParamList } from 'src/router'
import ReadStorage from 'src/storage/ReadStorage'
import styled from 'styled-components/native'

export type HomeProps = BottomTabScreenProps<RootStackParamList, `Home`>

export function Home(props: HomeProps) {
  const a = useAsync(async () => await ReadStorage.get())

  useOnRouteEnter(() => {
    a.reload()
  })

  return (
    <HomeBase>
      <Card showIf={a.value}>
        <Text>Get back where you left</Text>
        <Btn
          onTouchEnd={() =>
            props.navigation.navigate(`Read`, {
              screen: a.value?.book,
              params: { screen: a.value?.chapter.toString() },
            })
          }
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
  color: #122447;
  margin-top: 30px;
` as typeof Button
