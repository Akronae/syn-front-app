import * as ProtoNative from '@proto-native'

export type Theme = ProtoNative.Theme

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    surface: {
      primary: `#564f95`,
      default: `#000000`,
      contrast: `#ffffff`,
      disabled: `#32373e`,
      sub: `#64656d`,
      error: `#ff0000`,
    },
    text: {
      primary: `#acaeb4`,
      sub: `#64656d`,
      contrast: `#fff`,
      heavy: `#000`,
      light: `#acaeb4`,
      error: `#ff0000`,
    },
    border: {
      default: `#32373e`,
    },
  },
  spacing: (index: number) => index * 4,
  borderRadius: (index: number) => index * 2,
  typography: {
    font: {
      regular: `MazzardH-Regular`,
      medium: `MazzardH-Medium`,
      bold: `MazzardH-Bold`,
      extraBold: `MazzardH-Bold`,
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
