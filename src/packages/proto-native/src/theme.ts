export interface Theme {
  dark: boolean
  colors: {
    surface: {
      default: string
      primary: string
      contrast: string
      sub: string
      disabled: string
      error: string
    }
    border: {
      disabled: string
    }
    text: {
      primary: string
      sub: string
      contrast: string
      heavy: string
      light: string
      error: string
    }
  }
  typography: {
    font: {
      black: string
      extraBold: string
      bold: string
      semiBold: string
      medium: string
      regular: string
      light: string
      extraLight: string
      thin: string
    }
    size: {
      xxl: number
      xl: number
      lg: number
      md: number
      sm: number
      xs: number
      xxs: number
    }
  }
  spacing: (index: number) => number
  borderRadius: (index: number) => number
}
