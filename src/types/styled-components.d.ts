import { SynTheme, Theme } from 'src/theme/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    syn: SynTheme
  }
}
