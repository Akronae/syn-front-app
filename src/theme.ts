import * as ProtoNative from '@proto-native/theme'

export interface Theme extends ProtoNative.Theme {
  dark: boolean
  colors: {
    primary: string
    surface: {
      primary: string
    }
    text: {
      primary: string
      sub: string
      contrast: string
    }
    border: string
    notification: string
  }
}

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: `#83a8fa`,
    surface: {
      primary: `#121212`,
    },
    text: {
      primary: `#acaeb4`,
      sub: `#64656d`,
      contrast: `#ededed`,
    },
    border: `#32373e`,
    notification: `#abc`,
  },
}

export const LightTheme: Theme = DarkTheme
