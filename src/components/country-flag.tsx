import * as React from 'react-native'
import { isWeb, themed } from '@proto-native/utils'
import { TextProps, Text } from './text'
import { CountryCode } from 'libphonenumber-js'
import { countryFlags } from '@proto-native/utils'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'
import { useEffect } from 'react'

export type CountryFlagProps = TextProps & {
  country: CountryCode
}

export function CountryFlag(props: CountryFlagProps) {
  const { children, ...passed } = props

  useEffect(() => {
    if (isWeb()) {
      if (!(window as any).protocountryFlagPolyfilled) {
        polyfillCountryFlagEmojis()
        ;(window as any).protocountryFlagPolyfilled = true
      }
    }
  }, [])

  return (
    <CountryFlagBase {...passed}>
      {countryFlags[props.country].flag}
      {children}
    </CountryFlagBase>
  )
}

const CountryFlagBase = themed<TextProps>(Text, (p) => {
  // using Twemoji Country Flags font on web to polyfill
  // Windows lack of support for emoji flags
  if (isWeb())
    return {
      fontFamily: `Twemoji Country Flags`,
    }
  return {}
})
