import { Base, BaseProps } from '@proto-native/components/base'
import { useInterval, useState } from '@proto-native/utils'
import { castArray } from 'lodash-es'
import * as React from 'react-native'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'

export interface ViewProps extends BaseProps {
  gap?: number | ((theme: DefaultTheme) => number)
  childRendering?: { instant?: { first?: number }; interval?: { ms: number } }
}

export function View(props: ViewProps) {
  const { children, gap: gapProps, childRendering, ...passed } = props
  const theme = useTheme()
  const gap = typeof gapProps === `function` ? gapProps(theme) : gapProps
  const renderedChildren = useState(childRendering?.instant?.first ?? 0)

  const flatChildren = castArray(children)
    .filter((c) => !!c)
    .flatMap((e, i, arr) => {
      if (i >= renderedChildren.state) return []

      const hasDivider = gap && i != arr.length - 1
      return [e, hasDivider && <Divider key={i + 100000} gap={gap} />]
    })

  if (!childRendering) {
    renderedChildren.state = flatChildren.length
  }

  useInterval((id) => {
    renderedChildren.state += 1
    if (renderedChildren.state >= flatChildren.length) {
      clearInterval(id)
    }
  }, childRendering?.interval?.ms)

  return <ViewBase {...passed}>{flatChildren}</ViewBase>
}

const ViewBase = styled(Base)`
  ${(p) => {
  if (React.Platform.OS === `web`)
    return `
        min-height: revert;
        min-width: revert;
      `
}}
` as typeof Base

const Divider = styled.View<{ gap?: number }>`
  height: ${(p) => p.gap};
`
