import { castArray } from 'lodash-es'
import * as ReactNative from 'react-native'
import { Base, BaseProps } from '~/components/Base'
import { useInterval } from '~/utils/react/useInterval'
import { useState } from '~/utils/react/useState'

export interface ExViewProps extends BaseProps {
  gap?: number
  childRendering?: { interval?: {ms: number, skipFirst: number} }
}

function Divider(props: { gap?: number }) {
  return <ReactNative.View style={{ height: props.gap }} />
}

export function View(props: ExViewProps) {
  const { style, children, gap, childRendering, ...passed } = props

  const flatChildren = castArray(children).flatMap((e, i) => [
    e,
    gap && <Divider key={i + 100000} gap={gap} />,
  ])

  const renderedChildren = useState(childRendering?.interval?.skipFirst ?? 0)

  if (!childRendering && renderedChildren.state !== flatChildren.length) {
    renderedChildren.state = flatChildren.length
  }

  useInterval((id) => {
    renderedChildren.state += 1
    if (renderedChildren.state >= flatChildren.length) {
      clearInterval(id)
    }
  }, childRendering?.interval?.ms)

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

const styles = ReactNative.StyleSheet.create({
  ExView: {
    minHeight: ReactNative.Platform.OS == `web` ? `revert` : undefined,
    minWidth: ReactNative.Platform.OS == `web` ? `revert` : undefined,
  },
})

export const ExViewStyles = styles
