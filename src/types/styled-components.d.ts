import { Theme } from '../theme'

declare module 'styled-components' {
  export interface DefaultTheme {
    proto: Theme
  }
}
