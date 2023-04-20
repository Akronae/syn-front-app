import React from 'react'

type ExtendedElementType<T, T2> = React.ElementType<T> & {
  extends?: React.ElementType<T2>
}

function isSubType(sub: React.ElementType | string, type: React.ElementType) {
  if (typeof sub === `string`) return false
  if (sub === type) return true
  let t = sub as ExtendedElementType<any, any>
  while (t.extends) {
    if (t.extends === type) return true
    t = t.extends
  }
}

export function getChildrenByType<T>(
  children: React.ReactNode,
  type: React.ElementType<T>,
): { taken: React.ReactElement<T>[]; left: React.ReactNode[] } {
  const taken: React.ReactElement<T>[] = []
  const left: React.ReactNode[] = []
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && isSubType(child.type, type))
      taken.push(child as React.ReactElement<T>)
    else if (child) left.push(child)
  })
  return { taken, left }
}
