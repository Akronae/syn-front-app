import * as ProtoNative from '@proto-native'

export type SynTheme = ProtoNative.Theme

export type AppTheme = {
  protonative: ProtoNative.Theme
  syn: SynTheme
}

const ProtoNativeDarkTheme: ProtoNative.Theme = {
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
      disabled: `#32373e`,
    },
  },
  spacing: (index: number) => index * 4,
  borderRadius: (index: number) => index * 2,
  typography: {
    font: {
      thin: `MazzardH-Thin`,
      extraLight: `MazzardH-ExtraLight`,
      light: `MazzardH-Light`,
      regular: `MazzardH-Regular`,
      medium: `MazzardH-Medium`,
      semiBold: `MazzardH-SemiBold`,
      bold: `MazzardH-Bold`,
      extraBold: `MazzardH-Bold`,
      black: `MazzardH-Black`,
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

export const Theme: AppTheme = {
  protonative: ProtoNativeDarkTheme,
  syn: ProtoNativeDarkTheme,
}
