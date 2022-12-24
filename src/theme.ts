export interface Theme {
  colors: {
    surface: {
      default: string
      primary: string
      contrast: string
    }
    text: {
      primary: string
      sub: string
      contrast: string
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
    }
  }
}
