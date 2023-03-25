import { useFonts } from 'expo-font'
import * as NavigationBar from 'expo-navigation-bar'
import { StatusBar } from 'expo-status-bar'
import { Platform, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Theme } from 'src/theme/theme'
import styled, { ThemeProvider } from 'styled-components/native'
import * as Proto from '@proto-native'
import { PortalHost, PortalProvider } from '@gorhom/portal'
import { isAndroid } from 'src/packages/proto-native/src/utils/device/is-android'
import { Stack } from 'expo-router'
import { getHeaderScreenOptions } from 'src/routing/get-header-screen-options'
import * as ReactNavigation from '@react-navigation/native'
import { getNavigationTheme } from 'src/routing/get-navigation-theme'

export default function App() {
  const [loaded] = useFonts({
    'MazzardH-Bold': require(`src/assets/fonts/Mazzard/MazzardH-Bold.ttf`),
    'MazzardH-Regular': require(`src/assets/fonts/Mazzard/MazzardH-Regular.ttf`),
    'MazzardH-Medium': require(`src/assets/fonts/Mazzard/MazzardH-Medium.ttf`),
  })

  NavigationBar.setBackgroundColorAsync(
    Theme.syn.colors.surface.primary || `#000`,
  )
  if (isAndroid()) NavigationBar.setVisibilityAsync(`hidden`)

  const isDark = useColorScheme() == `dark`
  if (Platform.OS == `web`)
    document.documentElement.style.setProperty(
      `color-scheme`,
      isDark ? `dark` : `light`,
    )

  if (!loaded) return null

  return (
    <ThemeProvider theme={Theme}>
      <ReactNavigation.ThemeProvider value={getNavigationTheme(Theme)}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PortalProvider>
            <Page>
              <Proto.StatusBarMockup />
              <StatusBar style='light' />
              <Stack
                screenOptions={{
                  ...getHeaderScreenOptions(Theme),
                  headerShown: false,
                }}
              />
            </Page>
            <PortalHost name='bottom-sheet' />
          </PortalProvider>
        </GestureHandlerRootView>
      </ReactNavigation.ThemeProvider>
    </ThemeProvider>
  )
}

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.syn.colors.surface.default};
  color: ${(props) => props.theme.syn.colors.text.primary};
  font-size: 18px;
`
