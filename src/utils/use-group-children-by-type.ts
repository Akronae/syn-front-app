import React from 'react'
import { useChildrenByType } from './use-children-by-type'

export type GrouppedChildrenByType<TKeys> = Record<
  keyof TKeys,
  React.ReactElement[]
> &
  Record<'others', React.ReactNode[]>

export function useGroupChildrenByType<TKeys>(
  children: React.ReactNode,
  types: Record<keyof TKeys, React.ElementType>,
): GrouppedChildrenByType<TKeys> {
  const groupped = { others: [] } as GrouppedChildrenByType<any>
  const grouppedChildren: React.ReactNode[] = []
  Object.entries(types).forEach(([typeName, type]) => {
    groupped[typeName] = []
    const { taken } = useChildrenByType(children, type as React.ElementType)
    groupped[typeName] = taken
    grouppedChildren.push(...taken)
  })

  React.Children.forEach(children, (child) => {
    if (child && !grouppedChildren.includes(child)) {
      groupped.others.push(child)
    }
  })

  return groupped
}
