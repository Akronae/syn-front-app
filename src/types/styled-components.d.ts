import { Theme } from '../theme'

declare module 'styled-components' {
  export interface DefaultTheme {
    proto: Theme
  }
}
declare module 'styled-components/native' {
  export interface DefaultTheme {
    proto: Theme
  }
}
