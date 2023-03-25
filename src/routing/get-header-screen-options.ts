import { DefaultTheme } from "styled-components/native";
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'


export function getHeaderScreenOptions(
  theme: DefaultTheme,
): NativeStackNavigationOptions {
  return {
    headerTintColor: theme.syn.colors.text.contrast,
    headerTitleStyle: { fontFamily: theme.syn.typography.font.regular },
  }
}