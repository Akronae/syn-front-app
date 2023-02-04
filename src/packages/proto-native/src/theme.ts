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
      medium: string
      regular: string
      bold: string
      extraBold: string
    }
    size: {
      xxl: number
      xl: number
      lg: number
      md: number
      sm: number
      xs: number
    }
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
