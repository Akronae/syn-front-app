export interface Theme {
    dark: boolean
    colors: {
        primary: string
        background: string
        card: string
        text: {
            primary: string
            sub: string
        }
        border: string
        notification: string
    }
}

export const DarkTheme: Theme = {
  dark: false,
  colors: {
    primary: `#83a8fa`,
    background: `#14191f`,
    card: `#14191f`,
    text: {
      primary: `#acaeb4`,
      sub: `#64656d`
    },
    border: `#32373e`,
    notification: `#abc`
  }
}

export const LightTheme: Theme = DarkTheme
