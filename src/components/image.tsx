import {
  Base,
  BaseProps,
  takeBaseOwnProps,
} from '@proto-native/components/base'
import { isWeb } from '@proto-native/utils/device/is-web'
import { themed } from '@proto-native/utils/theme/themed'
import * as ExpoImage from 'expo-image'
import { isUndefined, pickBy } from 'lodash-es'
import * as Native from 'react-native'

export type ImageProps = BaseProps<ExpoImage.ImageStyle, ExpoImage.ImageProps>

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

  const flattenStyle = Native.StyleSheet.flatten(style)
  const { resizeMode, ...styleRest } = flattenStyle
  const styleTaken = pickBy({ resizeMode }, (e) => !isUndefined(e))
  if (!styleTaken.resizeMode && (flattenStyle as any).objectFit)
    styleTaken.resizeMode = (flattenStyle as any).objectFit

  return { taken: { style: styleTaken }, rest: { ...rest, style: styleRest } }
}

const ImageBase = Base

const Img = themed(ExpoImage.Image, (p) => ({
  width: `100%`,
  height: `100%`,
}))
