import { useNavigation } from '@react-navigation/native'
import { WebViewProps } from 'react-native-webview'

export function useWebViewRoute() {
  const navigation = useNavigation()

  const goWebViewScreen = (params: WebViewProps) => {
    navigation.navigate('web-view', {
      params,
    })
  }

  return {
    goWebViewScreen,
  }
}
