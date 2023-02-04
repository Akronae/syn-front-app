import { Button, ButtonPressAnimation } from '@proto-native'
import { Base } from '@proto-native'
import { Text } from '@proto-native'
import { useAsync } from '@proto-native'
import { View } from '@proto-native'
import { useOnRouteEnter } from '@proto-native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import * as React from 'react'
import { RootStackParamList } from 'src/router'
import ReadStorage from 'src/storage/ReadStorage'
import styled from 'styled-components/native'

export type HomeProps = BottomTabScreenProps<RootStackParamList, `Home`>

export function Home(props: HomeProps) {
  const read = useAsync(async () => await ReadStorage.get())

  useOnRouteEnter(() => {
    read.refresh()
  })

  return (
    <HomeBase>
      <Card showIf={read.value?.verse != null}>
        <Text>Get back where you left</Text>
        <Btn
          onTouchEnd={() =>
            props.navigation.navigate(`Read`, {
              screen: read.value?.book,
              params: {
                screen: read.value?.chapter.toString(),
                params: { verse: read.value?.verse },
              },
            })
          }
          icon={{ionicons: 'chevron-forward'}}
          pressAnimation={ButtonPressAnimation.ScaleDown}
        >
          {read.value?.book} {read.value?.chapter}:{read.value?.verse}
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
` as typeof View

const Btn = styled(Button)`
  background-color: #1e4894;
  color: #122447;
  margin-top: 30px;
` as typeof Button
