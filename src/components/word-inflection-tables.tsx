import { Base, BaseProps, Column, Row, Text, TextProps } from '@proto-native'
import { ReactElement, cloneElement } from 'react'
import * as React from 'react-native'
import {
  GenderInflection,
  NumberInflection,
  WordInflection,
} from 'src/api/api-client'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'

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
}
function Cell(props: CellProps) {
  const { flexGrow, header, ...passed } = props

  return (
    <Base
      tStyle={(t) => ({
        backgroundColor: t.syn.colors.surface.sub,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderColor: t.syn.colors.border.disabled,
        borderWidth: 1,
        flexGrow,
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
  const str = (x: string | string[]) => {
    if (Array.isArray(x)) return x.join(`·`)
    return x
  }

  const contracted = [
    <Cell key='sg.voc'>{str(infl.singular.vocative[contraction])}</Cell>,
    <Cell key='sg.nom'>{str(infl.singular.nominative[contraction])}</Cell>,
    <Cell key='sg.acc'>{str(infl.singular.accusative[contraction])}</Cell>,
    <Cell key='sg.dat'>{str(infl.singular.dative[contraction])}</Cell>,
    <Cell key='sg.gen'>{str(infl.singular.genitive[contraction])}</Cell>,
    <Cell key='pl.voc'>{str(infl.plural.vocative[contraction])}</Cell>,
    <Cell key='pl.nom'>{str(infl.plural.nominative[contraction])}</Cell>,
    <Cell key='pl.acc'>{str(infl.plural.accusative[contraction])}</Cell>,
    <Cell key='pl.dat'>{str(infl.plural.dative[contraction])}</Cell>,
    <Cell key='pl.gen'>{str(infl.plural.genitive[contraction])}</Cell>,
  ]

  const newarr: ReactElement[] = []
  for (const cell of contracted) {
    const i = contracted.indexOf(cell)
    const previous = contracted[i - 1] as ReactElement
    const next = contracted[i + 1] as ReactElement

    if (next?.props.children === cell.props.children) {
      newarr.push(cloneElement(cell, { flexGrow: 1 }))
      continue
    }
    if (previous?.props.children === cell.props.children) {
      continue
    }
    newarr.push(cell)
  }

  return newarr
}

const getNounInflectionColumns = (infl: GenderInflection) => {
  const makeCol = (header: string, infl: NumberInflection) => {
    return (
      <Column flexGrow={1} key={header}>
        <Cell header>{header}</Cell>
        <Row flex={1}>
          <Column flexGrow={1}>
            <Cell header>Contracted</Cell>
            {getNumberInflectionCells(infl, `contracted`)}
          </Column>
          <Column flexGrow={1}>
            <Cell header>Uncontracted</Cell>
            {getNumberInflectionCells(infl, `uncontracted`)}
          </Column>
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
            <Cell flexGrow={1} header>
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

const getWordInflectionTables = (inflection: WordInflection) => {
  return <>{inflection.noun && getInflectionNounTable(inflection.noun)}</>
}
