import {
  Base,
  BaseProps,
  BottomSheet,
  Column,
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
import { WordInflectionTables } from './word-inflection-tables'

export type WordDetailsProps = BaseProps & {
  word: ReactiveState<Word | undefined>
}

export function WordDetails(props: WordDetailsProps) {
  const { word, ...passed } = props
  const open = useState(true)

  const wordQuery = useQuery({
    queryKey: [`get-word`, word.state?.text, word.state?.declension],
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
  }).data?.data

  useEffect(() => {
    open.state = !!word.state
  }, [word.state])
  useEffect(() => {
    if (!open.state) word.state = undefined
  }, [open.state])

  if (!word || !wordQuery || !word.state) return null

  const declension = word.state.declension
  const article =
    declension.gender == `masculine`
      ? `ὁ`
      : declension.gender == `feminine`
      ? `ἡ`
      : `τό`

  const inflection = wordQuery.inflections[0]
  const uncontracted =
    declension.gender &&
    declension.number &&
    inflection?.noun?.[declension.gender]?.[declension.number]?.nominative?.[0]
      .uncontracted

  return (
    <WordDetailsBase {...passed}>
      <BottomSheet open={open}>
        <Column gap={10}>
          <Column gap={5}>
            <Title>
              {article} {wordQuery.lemma}
            </Title>
            <Description>{uncontracted?.join(`·`)}</Description>
          </Column>
          <Column gap={5}>
            {wordQuery?.definitions.map((def, i) => (
              <Description key={i}>{def.litteral || def.formof}</Description>
            ))}
          </Column>
          {inflection && <WordInflectionTables inflection={inflection} />}
        </Column>
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
