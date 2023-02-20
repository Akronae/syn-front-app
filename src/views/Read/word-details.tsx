import {
  Base,
  BaseProps,
  BottomSheet,
  ReactiveState,
  Text,
  useState,
} from '@proto-native'
import { useEffect } from 'react'
import * as React from 'react-native'
import styled from 'styled-components/native'

export type WordDetailsProps = BaseProps & {
  word: ReactiveState<string | undefined>
  // open: BottomSheetProps['open']
}

export function WordDetails(props: WordDetailsProps) {
  const { word, ...passed } = props
  const open = useState(true)

  useEffect(() => {
    open.state = !!word.state
  }, [word.state])

  if (!word) return null

  return (
    <WordDetailsBase {...passed}>
      <BottomSheet open={open}>
        <Text>My awesome content here {word.state}.</Text>
      </BottomSheet>
    </WordDetailsBase>
  )
}

const WordDetailsBase = styled(Base)``