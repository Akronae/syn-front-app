export interface Theme {
  colors: {
    surface: {
      default: string
      primary: string
      contrast: string
      sub: string
      disabled: string
    }
    text: {
      primary: string
      sub: string
      contrast: string
      light: string
    }
  }
  typography: {
    font: {
      light: string
      regular: string
      bold: string
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
