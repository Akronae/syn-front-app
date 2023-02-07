import { Base, BaseProps } from '@proto-native/components/base'
import { useInterval, useState } from '@proto-native/utils'
import { computeThemeValue } from '@proto-native/utils/theme/compute-theme-value'
import { ThemeValue } from '@proto-native/utils/theme/theme-value'
import { castArray } from 'lodash-es'
import { Children, useMemo } from 'react'
import * as React from 'react-native'
import styled, { css, useTheme } from 'styled-components/native'

export interface ViewProps extends BaseProps {
  gap?: { vertical?: ThemeValue<number>; horizontal?: ThemeValue<number> }
  childRendering?: { instant?: { first?: number }; interval?: { ms: number } }
}

export function View(props: ViewProps) {
  const { children, gap: gapProps, childRendering, ...passed } = props
  const theme = useTheme()
  const gap = {
    vertical: computeThemeValue(gapProps?.vertical, theme),
    horizontal: computeThemeValue(gapProps?.horizontal, theme),
  }
  const childrenToRenderCount = useState(
    (() => {
      if (!childRendering) return Children.count(children)
      if (childRendering?.instant?.first) {
        return childRendering.instant.first
      }
      return 0
    })(),
  )

  const flatChildren = useMemo(() => {
    return castArray(children)
      .filter((c) => !!c)
      .flatMap((e, i, arr) => {
        if (i >= childrenToRenderCount.state) return []

        const hasDivider =
          (gap?.horizontal || gap.vertical) && i != arr.length - 1
        return [e, hasDivider ? <Divider key={i + 100000} gap={gap} /> : null]
      })
  }, [children, gap, childrenToRenderCount, childRendering])

  if (!childRendering) {
    childrenToRenderCount.state = flatChildren.length
  }

  useInterval((id) => {
    if (childrenToRenderCount.state >= flatChildren.length) {
      clearInterval(id)
    }
    childrenToRenderCount.state += 1
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

const Divider = styled.View<{
  gap?: { horizontal?: number; vertical?: number }
}>`
  ${(p) =>
    p.gap?.vertical &&
    css`
      height: ${p.gap.vertical}px;
    `}
  ${(p) =>
    p.gap?.horizontal &&
    css`
      width: ${p.gap.horizontal}px;
    `}
`
