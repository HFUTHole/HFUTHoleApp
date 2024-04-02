import { Platform } from 'react-native'

export class App {
  static get OS() {
    return Platform.OS
  }

  static get isIOS() {
    return App.OS === 'ios'
  }

  static get isAndroid() {
    return App.OS === 'android'
  }
}
