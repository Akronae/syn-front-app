import { useFonts } from 'expo-font'
import * as NavigationBar from 'expo-navigation-bar'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, useColorScheme } from 'react-native'
import {
  GestureHandlerRootView,
  enableExperimentalWebImplementation,
} from 'react-native-gesture-handler'
import { Theme } from 'src/theme/theme'
import { ThemeProvider } from 'styled-components/native'
import * as Proto from '@proto-native'
import { PortalHost, PortalProvider } from '@gorhom/portal'
import { isAndroid } from 'src/packages/proto-native/src/utils/device/is-android'
import { Stack } from 'expo-router'
import { getHeaderScreenOptions } from 'src/routing/get-header-screen-options'
import * as ReactNavigation from '@react-navigation/native'
import { getNavigationTheme } from 'src/routing/get-navigation-theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function AppLayout() {
  enableExperimentalWebImplementation()

  const [loaded] = useFonts({
    'MazzardH-Bold': require(`src/assets/fonts/Mazzard/MazzardH-Bold.ttf`),
    'MazzardH-Regular': require(`src/assets/fonts/Mazzard/MazzardH-Regular.ttf`),
    'MazzardH-Medium': require(`src/assets/fonts/Mazzard/MazzardH-Medium.ttf`),
    'Inter-Bold': require(`src/assets/fonts/Inter/Inter-Bold.ttf`),
    'Inter-SemiBold': require(`src/assets/fonts/Inter/Inter-SemiBold.ttf`),
    'Inter-Regular': require(`src/assets/fonts/Inter/Inter-Regular.ttf`),
    'Inter-Medium': require(`src/assets/fonts/Inter/Inter-Medium.ttf`),
    'Inter-Light': require(`src/assets/fonts/Inter/Inter-Light.ttf`),
    'Inter-Thin': require(`src/assets/fonts/Inter/Inter-Thin.ttf`),
  })

  if (isAndroid())
    NavigationBar.setBackgroundColorAsync(
      Theme.syn.colors.surface.default || `#000`,
    )
  if (isAndroid()) NavigationBar.setVisibilityAsync(`hidden`)

  const isDark = useColorScheme() == `dark`
  if (Proto.isWeb())
    window.document.documentElement.style.setProperty(
      `color-scheme`,
      isDark ? `dark` : `light`,
    )

  if (!loaded) return null

  return (
    <ThemeProvider theme={Theme}>
      <ReactNavigation.ThemeProvider value={getNavigationTheme(Theme)}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </ReactNavigation.ThemeProvider>
    </ThemeProvider>
  )
}

const Page = Proto.themed(SafeAreaView, (p) => ({
  flex: 1,
  backgroundColor: p.theme.syn.colors.surface.default,
  color: p.theme.syn.colors.text.primary,
  fontSize: 18,
}))
