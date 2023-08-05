import 'styled-components'

export interface Colors {
  primary: string
  background: string
  nav: string
  border: string
  text: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: string[]
    space: string[]
    fontSizes: string[]
    colors: Colors
  }
}
