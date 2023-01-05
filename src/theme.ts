import * as ProtoNative from '@proto-native'

export interface Theme extends ProtoNative.Theme {
  dark: boolean
  colors: {
    primary: string
    surface: {
      primary: string
      default: string
      contrast: string
      sub: string
      disabled: string
    }
    text: {
      primary: string
      sub: string
      contrast: string
      heavy: string
      light: string
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
      primary: `#564f95`,
      default: `#000000`,
      contrast: `#ffffff`,
      disabled: `#32373e`,
      sub: `#64656d`,
    },
    text: {
      primary: `#acaeb4`,
      sub: `#64656d`,
      contrast: `#fff`,
      heavy: `#000`,
      light: `#acaeb4`,
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
      xxl: 48,
      xl: 32,
      lg: 24,
      md: 18,
      sm: 16,
      xs: 14,
    },
  },
}

export const LightTheme: Theme = DarkTheme
