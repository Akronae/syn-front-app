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

export type WordDetailsProps = BaseProps & {
  word?: string
  open: BottomSheetProps['open']
}

export function WordDetails(props: WordDetailsProps) {
  const { word, ...passed } = props
  const open = useState(true)

  if (!word) return null

  return (
    <WordDetailsBase {...passed}>
      <BottomSheet open={open}>
        <Text>My awesome content here {word}.</Text>
      </BottomSheet>
    </WordDetailsBase>
  )
}

const WordDetailsBase = styled(Base)``
