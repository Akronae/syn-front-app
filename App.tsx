import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar'
import {
  useColorScheme,
  Platform,
} from 'react-native'

import { Router } from 'src/router'
import { DarkTheme } from 'src/theme'
import styled, {ThemeProvider, useTheme} from 'styled-components/native'


export default function App() {
  const theme = useTheme()
  NavigationBar.setBackgroundColorAsync(theme?.colors?.surface?.primary || `#000`)
  NavigationBar.setVisibilityAsync(`hidden`)


  if (Platform.OS == `web`)
    document.documentElement.style.setProperty(
      `color-scheme`,
      useColorScheme() == `dark` ? `dark` : `light`,
    )

  return (
    <ThemeProvider theme={DarkTheme} >
      <Page>
        <StatusBar style='light' />
        <Router />
      </Page>
    </ThemeProvider>
  )
}

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
  font-size: 18px;
`
