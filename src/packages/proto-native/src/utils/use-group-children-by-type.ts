import React, { useMemo } from 'react'
import {
  groupChildrenByType,
  GrouppedChildrenByType,
} from './group-children-by-type'

export function useGroupChildrenByType<TKeys>(
  children: React.ReactNode,
  types: Record<keyof TKeys, React.ElementType>,
): GrouppedChildrenByType<TKeys> {
  return useMemo(() => {
    return groupChildrenByType(children, types)
  }, [children, types])
}
