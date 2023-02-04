import {
  Base,
  BaseProps,
  BottomSheet,
  BottomSheetProps,
  Text,
  useState,
} from '@proto-native'
import * as React from 'react-native'
import styled from 'styled-components/native'
import { Word } from 'src/types'

export type WordDetailsProps = BaseProps & {
  word?: Word
  open: BottomSheetProps['open']
}

export function WordDetails(props: WordDetailsProps) {
  const { word, ...passed } = props
  const open = useState(true)

  if (!word) return null

  return (
    <WordDetailsBase {...passed}>
      <BottomSheet open={open}>
        <Text>My awesome content here {word.greek}.</Text>
      </BottomSheet>
    </WordDetailsBase>
  )
}

const WordDetailsBase = styled(Base)``
