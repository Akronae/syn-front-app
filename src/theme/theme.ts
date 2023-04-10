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
      primary: `#800080`,
      default: `#000000`,
      contrast: `#ffffff`,
      disabled: `#32373e`,
      sub: `#222`,
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
      thin: `Inter-Thin`,
      extraLight: `Inter-Thin`,
      light: `Inter-Light`,
      regular: `Inter-Regular`,
      medium: `Inter-Medium`,
      semiBold: `Inter-SemiBold`,
      bold: `MazzardH-Bold`,
      extraBold: `MazzardH-Bold`,
      black: `MazzardH-Black`,
    },
    size: {
      xxl: 48,
      xl: 32,
      lg: 24,
      md: 20,
      sm: 16,
      xs: 14,
      xxs: 11,
    },
  },
}

export const Theme: AppTheme = {
  protonative: ProtoNativeDarkTheme,
  syn: ProtoNativeDarkTheme,
}
