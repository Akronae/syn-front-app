import 'expo-router/entry'
import 'core-js'
import { LogBox } from 'react-native'
import { registerRootComponent } from 'expo'
import { ExpoRoot } from 'expo-router'

// Must be exported or Fast Refresh won't update the context
export function App() {
  // see: https://stackoverflow.com/questions/58923065/why-does-styled-components-5-x-warn-about-expected-style-to-contain-units/74667224#74667224
  LogBox.ignoreLogs([`to contain units`])
  const ctx = require.context('./src/app')
  return <ExpoRoot context={ctx} />
}

registerRootComponent(App)