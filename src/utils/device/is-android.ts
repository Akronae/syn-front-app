import { Platform } from "react-native";

export function isAndroid() {
    return Platform.OS === 'android'
}