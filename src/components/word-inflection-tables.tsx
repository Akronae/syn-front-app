import { Base, BaseProps, Column, Row, Text, TextProps } from '@proto-native'
import { ReactElement, cloneElement } from 'react'
import * as React from 'react-native'
import {
  FormInflection,
  GenderInflection,
  NumberInflection,
  VerbInflectionContraction,
  VerbInflectionForm,
  VerbInflectionInfinitive,
  VerbInflectionMoods,
  VerbInflectionParticiple,
  VerbInflectionTenses,
  VerbInflectionThemes,
  VerbInflectionVoices,
  WordInflection,
} from 'src/api/api-client'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'
import { Greek } from './greek'

export type WordInflectionTablePropss = BaseProps & {
  inflection: WordInflection
}

export function WordInflectionTables(props: WordInflectionTablePropss) {
  const { inflection, ...passed } = props

  return (
    <WordInflectionTableBases {...passed}>
      {getWordInflectionTables(inflection)}
    </WordInflectionTableBases>
  )
}

const WordInflectionTableBases = themed(Base, (p) => ({}))

type CellProps = TextProps & {
  flexGrow?: React.FlexStyle['flexGrow']
  header?: boolean
  width?: number
}
function Cell(props: CellProps) {
  const { flexGrow, header, width, ...passed } = props

  return (
    <Base
      tStyle={(t) => ({
        backgroundColor: t.syn.colors.surface.sub,
        paddingHorizontal: header ? 5 : 10,
        paddingVertical: 10,
        borderColor: t.syn.colors.border.disabled,
        borderWidth: 1,
        flexGrow,
        width,
      })}
      {...passed}
    >
      <Text
        fontSize={12}
        bold={header}
        style={{ textAlign: header ? `center` : `auto` }}
        {...props}
      />
    </Base>
  )
}

const getNumberInflectionCells = (
  infl: NumberInflection,
  contraction: 'contracted' | 'uncontracted',
) => {
  const str = (
    forms: FormInflection[] | undefined,
    contraction: 'contracted' | 'uncontracted',
  ) => {
    return (
      forms
        ?.map((form) => {
          const x = form[contraction]
          if (!x) return null
          if (Array.isArray(x)) return x.join(`·`)
          return x
        })
        .filter(Boolean)
        .join(', ') || ' '
    )
  }

  const cells = [
    <Cell key='sg.voc'>{str(infl.singular?.vocative, contraction)}</Cell>,
    <Cell key='sg.nom'>{str(infl.singular?.nominative, contraction)}</Cell>,
    <Cell key='sg.acc'>{str(infl.singular?.accusative, contraction)}</Cell>,
    <Cell key='sg.dat'>{str(infl.singular?.dative, contraction)}</Cell>,
    <Cell key='sg.gen'>{str(infl.singular?.genitive, contraction)}</Cell>,
    ...(infl.plural
      ? [
          <Cell key='pl.voc'>{str(infl.plural.vocative, contraction)}</Cell>,
          <Cell key='pl.nom'>{str(infl.plural.nominative, contraction)}</Cell>,
          <Cell key='pl.acc'>{str(infl.plural.accusative, contraction)}</Cell>,
          <Cell key='pl.dat'>{str(infl.plural.dative, contraction)}</Cell>,
          <Cell key='pl.gen'>{str(infl.plural.genitive, contraction)}</Cell>,
        ]
      : []),
  ]

  const newarr: ReactElement[] = []
  for (const cell of cells) {
    const i = cells.indexOf(cell)
    const previous = cells[i - 1] as ReactElement
    const next = cells[i + 1] as ReactElement

    if (previous?.props.children === cell.props.children) {
      continue
    }
    if (next?.props.children === cell.props.children) {
      newarr.push(cloneElement(cell, { flexGrow: 1 }))
      continue
    }

    newarr.push(cell)
  }

  const isEmptyColumn = newarr.every((x) => !x.props.children.toString().trim())
  if (isEmptyColumn) return []

  return newarr
}

const getNounInflectionColumns = (infl: GenderInflection) => {
  const makeCol = (header: string, infl: NumberInflection) => {
    const contracted = getNumberInflectionCells(infl, `contracted`)
    const uncontracted = getNumberInflectionCells(infl, `uncontracted`)

    const hasContracted = contracted.some((x) => x.props.children)
    const hasUncontracted = uncontracted.some((x) => x.props.children)

    return (
      <Column key={header}>
        <Cell header>{header}</Cell>
        <Row flexGrow={1}>
          {hasContracted && (
            <Column flexGrow={1}>
              <Cell header>Contracted</Cell>
              {contracted}
            </Column>
          )}
          {hasUncontracted && (
            <Column flexGrow={1}>
              <Cell header>Uncontracted</Cell>
              {uncontracted}
            </Column>
          )}
        </Row>
      </Column>
    )
  }

  return [
    infl.masculine && makeCol(`Masculine`, infl.masculine),
    infl.feminine && makeCol(`Feminine`, infl.feminine),
    infl.neuter && makeCol(`Neuter`, infl.neuter),
  ]
}

const getInflectionNounTable = (inflection: GenderInflection) => {
  const hasPlural =
    inflection.masculine?.plural ||
    inflection.feminine?.plural ||
    inflection.neuter?.plural

  return (
    <Row>
      <Column>
        <Row>
          <Column>
            <Cell header> </Cell>
            <Cell header> </Cell>
            <Cell flexGrow={1} header>
              Sg
            </Cell>
            {hasPlural && (
              <Cell flexGrow={1} header>
                Pl
              </Cell>
            )}
          </Column>
          <Column>
            <Cell header> </Cell>
            <Cell header> </Cell>
            <Cell header>Voc</Cell>
            <Cell header>Nom</Cell>
            <Cell header>Acc</Cell>
            <Cell header>Dat</Cell>
            <Cell header>Gen</Cell>
            {hasPlural && (
              <>
                <Cell header>Voc</Cell>
                <Cell header>Nom</Cell>
                <Cell header>Acc</Cell>
                <Cell header>Dat</Cell>
                <Cell header>Gen</Cell>
              </>
            )}
          </Column>
        </Row>
      </Column>
      <React.ScrollView
        horizontal
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        {getNounInflectionColumns(inflection)}
      </React.ScrollView>
    </Row>
  )
}

const getVerbInflectionInfinitiveTables = (inf: VerbInflectionInfinitive) => {
  const s = (x: VerbInflectionForm[] | undefined) =>
    x?.map((x) => x.contracted).join(', ') || ' '

  return (
    <Row>
      <Column>
        <Cell header>Active</Cell>
        <Cell header>{s(inf.active)}</Cell>
      </Column>
      <Column>
        <Cell header>Middle</Cell>
        <Cell header>{s(inf.middle)}</Cell>
      </Column>
      <Column>
        <Cell header>Passive</Cell>
        <Cell header>{s(inf.passive)}</Cell>
      </Column>
    </Row>
  )
}

const getVerbInflectionParticipleTables = (inf: VerbInflectionParticiple) => {
  const s = (x: FormInflection[] | undefined) =>
    x?.map((x) => x.contracted).join(', ') || ' '

  const col = (
    voice: keyof VerbInflectionParticiple,
    gender: keyof GenderInflection,
  ) => {
    return (
      <>
        <Cell>{s(inf.active?.feminine?.singular?.vocative)}</Cell>
        <Cell>{s(inf[voice]?.[gender]?.singular?.nominative)}</Cell>
        <Cell>{s(inf[voice]?.[gender]?.singular?.accusative)}</Cell>
        <Cell>{s(inf[voice]?.[gender]?.singular?.dative)}</Cell>
        <Cell>{s(inf[voice]?.[gender]?.singular?.genitive)}</Cell>
        <Cell>{s(inf[voice]?.[gender]?.plural?.vocative)}</Cell>
        <Cell>{s(inf[voice]?.[gender]?.plural?.nominative)}</Cell>
        <Cell>{s(inf[voice]?.[gender]?.plural?.accusative)}</Cell>
        <Cell>{s(inf[voice]?.[gender]?.plural?.dative)}</Cell>
        <Cell>{s(inf[voice]?.[gender]?.plural?.genitive)}</Cell>
      </>
    )
  }

  return (
    <Row flexWrap='nowrap'>
      <Column>
        <Cell header> </Cell>
        <Cell header> </Cell>
        <Cell header flexGrow={1}>
          Sg
        </Cell>
        <Cell header flexGrow={1}>
          Pl
        </Cell>
      </Column>
      <Column>
        <Cell header> </Cell>
        <Cell header> </Cell>
        <Cell header>Voc</Cell>
        <Cell header>Nom</Cell>
        <Cell header>Acc</Cell>
        <Cell header>Dat</Cell>
        <Cell header>Gen</Cell>
        <Cell header>Voc</Cell>
        <Cell header>Nom</Cell>
        <Cell header>Acc</Cell>
        <Cell header>Dat</Cell>
        <Cell header>Gen</Cell>
      </Column>
      <React.ScrollView
        horizontal
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <Column>
          <Cell header>Active</Cell>
          <Row>
            <Column>
              <Cell header>Fem</Cell>
              {col('active', 'feminine')}
            </Column>
            <Column>
              <Cell header>Masc</Cell>
              {col('active', 'masculine')}
            </Column>
            <Column>
              <Cell header>Neu</Cell>
              {col('active', 'neuter')}
            </Column>
          </Row>
        </Column>
        <Column>
          <Cell header>Middle</Cell>
          <Row>
            <Column>
              <Cell header>Fem</Cell>
              {col('middle', 'feminine')}
            </Column>
            <Column>
              <Cell header>Masc</Cell>
              {col('middle', 'masculine')}
            </Column>
            <Column>
              <Cell header>Neu</Cell>
              {col('middle', 'neuter')}
            </Column>
          </Row>
        </Column>
        <Column>
          <Cell header>Passive</Cell>
          <Row>
            <Column>
              <Cell header>Fem</Cell>
              {col('passive', 'feminine')}
            </Column>
            <Column>
              <Cell header>Masc</Cell>
              {col('passive', 'masculine')}
            </Column>
            <Column>
              <Cell header>Neu</Cell>
              {col('passive', 'neuter')}
            </Column>
          </Row>
        </Column>
      </React.ScrollView>
    </Row>
  )
}

const getInflectionVerbTables = (inflection: VerbInflectionTenses) => {
  type Decl = {
    tense: keyof VerbInflectionTenses
    theme: keyof VerbInflectionThemes
    contraction: keyof VerbInflectionContraction
    mood: keyof VerbInflectionMoods
  }
  const alls: [Decl, VerbInflectionMoods][] = []

  for (const tense in inflection) {
    const tenses = inflection[tense as keyof VerbInflectionTenses]
    if (!tenses) continue

    for (const theme in tenses) {
      const themes = tenses[theme as keyof VerbInflectionThemes]
      if (!themes) continue

      for (const contraction in themes) {
        const contractions =
          themes[contraction as keyof VerbInflectionContraction]
        if (!contractions) continue

        for (const mood in contractions) {
          const moods = contractions[mood as keyof VerbInflectionMoods]
          if (!moods) continue

          alls.push([
            { tense, theme, contraction, mood } as any,
            { [mood]: moods },
          ])
        }
      }
    }
  }

  const tables: [Decl, ReactElement][] = []
  for (const [decl, moods] of alls) {
    if (moods.imperative) {
      tables.push([decl, getVerbInflectionVoicesTables(moods.imperative)])
    }
    if (moods.indicative) {
      tables.push([decl, getVerbInflectionVoicesTables(moods.indicative)])
    }
    if (moods.optative) {
      tables.push([decl, getVerbInflectionVoicesTables(moods.optative)])
    }
    if (moods.pluperfect) {
      tables.push([decl, getVerbInflectionVoicesTables(moods.pluperfect)])
    }
    if (moods.subjunctive) {
      tables.push([decl, getVerbInflectionVoicesTables(moods.subjunctive)])
    }
    if (moods.infinitive) {
      tables.push([decl, getVerbInflectionInfinitiveTables(moods.infinitive)])
    }
    if (moods.participle) {
      tables.push([decl, getVerbInflectionParticipleTables(moods.participle)])
    }
  }

  return tables
}

const getVerbInflectionVoicesTables = (themes: VerbInflectionVoices) => {
  const s = (x: VerbInflectionForm[] | undefined) =>
    x ? x.map((x) => x.contracted).join(', ') : ' '

  const col = (voice: keyof VerbInflectionVoices) => {
    return [
      s(themes[voice]?.singular?.first),
      s(themes[voice]?.singular?.second),
      s(themes[voice]?.singular?.third),
      s(themes[voice]?.plural?.first),
      s(themes[voice]?.plural?.second),
      s(themes[voice]?.plural?.third),
      s(themes[voice]?.dual?.first),
      s(themes[voice]?.dual?.second),
      s(themes[voice]?.dual?.third),
    ]
  }

  const active = col('active')
  const middle = col('middle')
  const passive = col('passive')

  const useMedioPassive = middle.every((x, i) => passive[i] === x)

  return (
    <Row flexWrap='nowrap'>
      <Column>
        <Cell header> </Cell>
        <Cell header flexGrow={1}>
          Sg
        </Cell>
        <Cell header flexGrow={1}>
          Pl
        </Cell>
        <Cell header flexGrow={1}>
          Du
        </Cell>
      </Column>
      <Column>
        <Cell header> </Cell>
        <Cell header>1st</Cell>
        <Cell header>2nd</Cell>
        <Cell header>3rd</Cell>
        <Cell header>1st</Cell>
        <Cell header>2nd</Cell>
        <Cell header>3rd</Cell>
        <Cell header>1st</Cell>
        <Cell header>2nd</Cell>
        <Cell header>3rd</Cell>
      </Column>
      <React.ScrollView
        horizontal
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <Column>
          <Cell header>Active</Cell>
          {active.map((x, i) => (
            <Cell key={i}>{x}</Cell>
          ))}
        </Column>
        {!useMedioPassive && (
          <>
            <Column>
              <Cell header>Middle</Cell>
              {middle.map((x, i) => (
                <Cell key={i}>{x}</Cell>
              ))}
            </Column>
            <Column>
              <Cell header>Passive</Cell>
              {passive.map((x, i) => (
                <Cell key={i}>{x}</Cell>
              ))}
            </Column>
          </>
        )}
        {useMedioPassive && (
          <Column>
            <Cell header>Middle/Passive</Cell>
            {middle.map((x, i) => (
              <Cell key={i}>{x}</Cell>
            ))}
          </Column>
        )}
      </React.ScrollView>
    </Row>
  )
}

const getWordInflectionTables = (inflection: WordInflection) => {
  return (
    <>
      {inflection.noun && getInflectionNounTable(inflection.noun)}
      {inflection.pronoun && getInflectionNounTable(inflection.pronoun)}
      {inflection.article && getInflectionNounTable(inflection.article)}
      {inflection.verb && (
        <Column gap={20}>
          {getInflectionVerbTables(inflection.verb).map(([decl, table], i) => (
            <Column key={i} gap={10}>
              <Text capitalize fontSize={16}>
                {decl.tense} {decl.mood}{' '}
                {decl.contraction == 'contracted' ? 'contracted' : ''}
              </Text>
              {table}
            </Column>
          ))}
        </Column>
      )}
    </>
  )
}
