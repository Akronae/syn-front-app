import {
  Base,
  BaseProps,
  takeBaseOwnProps,
} from '@proto-native/components/base'
import { isUndefined, pickBy } from 'lodash-es'
import * as React from 'react-native'
import styled from 'styled-components/native'

export type ImageProps = BaseProps<React.ImageStyle, React.ImageProps>

export function Image(props: ImageProps) {
  const { ...passed } = props
  const imgProps = takeImageOwnProps(passed)
  const baseProps = takeBaseOwnProps(imgProps.rest)

  return (
    <ImageBase {...baseProps.taken}>
      <Img {...baseProps.rest} {...imgProps.taken} />
    </ImageBase>
  )
}

export function takeImageOwnProps(props: ImageProps) {
  const { style, ...rest } = props

  const flattenStyle = React.StyleSheet.flatten(style)
  const { resizeMode, ...styleRest } = flattenStyle
  const styleTaken = pickBy({ resizeMode }, (e) => !isUndefined(e))
  if (!styleTaken.resizeMode && (flattenStyle as any).objectFit)
    styleTaken.resizeMode = (flattenStyle as any).objectFit

  return { taken: { style: styleTaken }, rest: { ...rest, style: styleRest } }
}

const ImageBase = styled(Base)`` as typeof Base

const Img = styled(React.Image)`
  width: 100%;
  height: 100%;
`
