import {
  Base,
  BaseProps,
  BottomSheet,
  ReactiveState,
  Text,
  themed,
  useState,
} from '@proto-native'
import { useEffect } from 'react'
import * as React from 'react-native'

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
  useEffect(() => {
    if (!open.state) word.state = undefined
  }, [open.state])

  if (!word) return null

  return (
    <WordDetailsBase {...passed}>
      <BottomSheet open={open}>
        <Title>{word.state}</Title>
      </BottomSheet>
    </WordDetailsBase>
  )
}

const WordDetailsBase = themed(Base, (p) => ({}))
const Title = themed(Text, (p) => ({
  fontSize: p.theme.syn.typography.size.xl,
}))
