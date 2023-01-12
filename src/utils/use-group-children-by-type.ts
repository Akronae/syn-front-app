import React from 'react'
import { useChildrenByType } from './use-children-by-type'

export function useGroupChildrenByType<TKeys>(
  children: React.ReactNode,
  types: Record<keyof TKeys, React.ElementType>,
): Record<keyof TKeys | 'others', React.ReactNode[]> {
  const groupped = { others: [] } as Record<any, React.ReactNode[]>
  const grouppedChildren: React.ReactNode[] = []
  Object.entries(types).forEach(([typeName, type]) => {
    groupped[typeName] = []
    const { taken } = useChildrenByType(children, type as React.ElementType)
    groupped[typeName] = taken
    grouppedChildren.push(...taken)
  })

  React.Children.forEach(children, (child) => {
    if (!grouppedChildren.includes(child)) {
      groupped.others.push(child)
    }
  })

  return groupped
}
