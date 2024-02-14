import {
  Base,
  BaseProps,
  BottomSheet,
  ReactiveState,
  Text,
  themed,
  useState,
} from '@proto-native'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import * as React from 'react-native'
import { api } from 'src/api/api-client'
import { Word } from 'src/types'

export type WordDetailsProps = BaseProps & {
  word: ReactiveState<Word | undefined>
}

export function WordDetails(props: WordDetailsProps) {
  const { word, ...passed } = props
  const open = useState(true)

  const wordQuery = useQuery({
    queryKey: ['get-word', word.state?.text, word.state?.declension],
    queryFn: () =>
      api.lexicon.get(
        word.state?.declension.indeclinable
          ? { lemma: word.state.text }
          : {
              inflection: {
                word: word.state!.text,
                declension: word.state!.declension,
              },
            },
      ),
    enabled: !!word.state,
  })

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
        <Title>{wordQuery.data?.data.lemma}</Title>
        <Translation>{wordQuery.data?.data.translation}</Translation>
        <Description>{wordQuery.data?.data.description}</Description>
      </BottomSheet>
    </WordDetailsBase>
  )
}

const WordDetailsBase = themed(Base, (p) => ({}))
const Title = themed(Text, (p) => ({
  fontSize: p.theme.syn.typography.size.xl,
}))
const Translation = themed(Text, (p) => ({
  fontSize: p.theme.syn.typography.size.lg,
}))
const Description = themed(Text, (p) => ({
  fontSize: p.theme.syn.typography.size.sm,
}))
