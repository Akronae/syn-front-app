import { useFonts } from 'expo-font'
import * as NavigationBar from 'expo-navigation-bar'
import { StatusBar } from 'expo-status-bar'
import { LogBox, Platform, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Router } from 'src/router'
import { Theme } from 'src/theme/theme'
import styled, { ThemeProvider, useTheme } from 'styled-components/native'
import * as Proto from '@proto-native'
import { PortalHost, PortalProvider } from '@gorhom/portal'

export default function App() {
  // see: https://stackoverflow.com/questions/58923065/why-does-styled-components-5-x-warn-about-expected-style-to-contain-units/74667224#74667224
  LogBox.ignoreLogs([`to contain units`])

  const [loaded] = useFonts({
    'MazzardH-Bold': require(`src/assets/fonts/Mazzard/MazzardH-Bold.ttf`),
    'MazzardH-Regular': require(`src/assets/fonts/Mazzard/MazzardH-Regular.ttf`),
    'MazzardH-Medium': require(`src/assets/fonts/Mazzard/MazzardH-Medium.ttf`),
  })

  const theme = useTheme()
  NavigationBar.setBackgroundColorAsync(
    theme?.syn.colors?.surface?.primary || `#000`,
  )
  NavigationBar.setVisibilityAsync(`hidden`)

  const isDark = useColorScheme() == `dark`
  if (Platform.OS == `web`)
    document.documentElement.style.setProperty(
      `color-scheme`,
      isDark ? `dark` : `light`,
    )

  if (!loaded) return null

  return (
    <ThemeProvider theme={Theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PortalProvider>
          <Page>
            <Proto.StatusBarMockup />
            <StatusBar style='light' />
            <Router />
          </Page>
          {/* <Base
            style={{
              position: `absolute`,
              bottom: 0,
              left: 0,
              width: `100%`,
              height: `100%`,
            }}
          > */}
          <PortalHost name='bottom-sheet' />
          {/* </Base> */}
        </PortalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.syn.colors.surface.default};
  color: ${(props) => props.theme.syn.colors.text.primary};
  font-size: 18px;
`
