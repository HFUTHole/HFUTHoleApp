import { KeyboardAvoidingViewProps, Platform } from 'react-native'

export class App {
  static get OS() {
    return Platform.OS
  }

  static get keyboardAvoidingBehavior(): KeyboardAvoidingViewProps['behavior'] {
    return App.isIOS ? 'padding' : 'height'
  }

  static get isIOS() {
    return App.OS === 'ios'
  }

  static get isAndroid() {
    return App.OS === 'android'
  }
}
