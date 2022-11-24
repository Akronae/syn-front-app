import { Base } from '@proto-native/base'
import { Text } from '@proto-native/text'
import { View } from '@proto-native/view'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import * as React from 'react-native'
import { useAsync } from 'react-use'
import { RootStackParamList } from 'src/router'
import ReadStorage from 'src/storage/ReadStorage'
import styled from 'styled-components/native'

export type HomeProps = BottomTabScreenProps<RootStackParamList, `Home`>

export function Home(props: HomeProps) {
  const a = useAsync(async () => await ReadStorage.get())

  return (
    <HomeBase>
      <Card showIf={!a.loading}>
        <Text>Get back where you left</Text>
        <CardBtn onPress={() => props.navigation.navigate(`Read`, {})}>
          <CardBtnText>
            {a.value?.book} {a.value?.chapter}
          </CardBtnText>
        </CardBtn>
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

const CardBtn = styled.Pressable`
  background-color: ${({ theme }) => `#3f83df`};
  margin-top: 30px;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: bold;
`

const CardBtnText = styled(Text)`
  color: #122447;
`
