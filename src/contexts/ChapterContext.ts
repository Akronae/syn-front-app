import React from 'react'
import { ReactiveState } from 'src/packages/proto-native/src'

export type ChapterContextHandle = {
  chapter: ReactiveState<number>
}

export const ChapterContext = React.createContext<ChapterContextHandle | null>(
  null,
)
