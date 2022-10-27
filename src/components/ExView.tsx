import { castArray } from 'lodash-es'
import { View, StyleSheet, Platform } from 'react-native'
import { Base, BaseProps } from '~/components/Base'
import { useInterval } from '~/utils/react/useInterval'
import { useState } from '~/utils/react/useState'

export interface ExViewProps extends BaseProps {
  gap?: number
  childRenderInterval?: number
}

function Divider(props: { gap?: number }) {
  return <View style={{ height: props.gap }} />
}

export function ExView(props: ExViewProps) {
  const { style, children, gap, childRenderInterval, ...passed } = props

  const flatChildren = castArray(children).flatMap((e, i) => [
    e,
    gap && <Divider key={i + 100000} gap={gap} />,
  ])

  const renderedChildren = useState(0)

  if (!childRenderInterval && renderedChildren.state !== flatChildren.length) {
    renderedChildren.state = flatChildren.length
  }
  
  useInterval((id) => {
    renderedChildren.state += 1
    if (renderedChildren.state >= flatChildren.length) {
      clearInterval(id)
    }
  }, childRenderInterval)

  return (
    <Base style={[style, styles.ExView]} {...passed}>
      {flatChildren.map((c, i) => {
        if (i < renderedChildren.state) {
          return c
        }
      })}
    </Base>
  )
}

const styles = StyleSheet.create({
  ExView: {
    minHeight: Platform.OS == `web` ? `revert` : undefined,
    minWidth: Platform.OS == `web` ? `revert` : undefined,
  },
})

export const ExViewStyles = styles
