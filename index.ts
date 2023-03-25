import 'expo-router/entry'
import 'core-js'
import { LogBox } from 'react-native'

// see: https://stackoverflow.com/questions/58923065/why-does-styled-components-5-x-warn-about-expected-style-to-contain-units/74667224#74667224
LogBox.ignoreLogs([`to contain units`])