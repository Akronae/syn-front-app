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
  spacing: {
    one: number
    two: number
    three: number
    four: number
    five: number
    six: number
    seven: number
  }
}

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: `#83a8fa`,
    surface: {
      primary: `#000`,
    },
    text: {
      primary: `#acaeb4`,
      sub: `#64656d`,
      contrast: `#fff`,
    },
    border: `#32373e`,
    notification: `#abc`,
  },
  spacing: {
    one: 4,
    two: 8,
    three: 12,
    four: 16,
    five: 24,
    six: 32,
    seven: 64,
  },
  typography: {
    font: {
      light: `MazzardH-Regular`,
      regular: `MazzardH-Medium`,
      bold: `MazzardH-Bold`,
    },
    size: {
      regular: 18,
    },
  },
}

export const LightTheme: Theme = DarkTheme
