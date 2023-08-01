import { Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { useWebViewRoute } from '@/shared/hooks/route/useWebViewRoute'

export function ForgetOnePassword() {
  const route = useWebViewRoute()

  const onForgetOneHFUTPasswordPress = () => {
    route.goWebViewScreen({
      source: {
        uri: 'https://cas.hfut.edu.cn/cas/forget?service=https://cas.hfut.edu.cn/cas/oauth2.0/callbackAuthorize?client_id=BsHfutEduPortal&redirect_uri=https%3A%2F%2Fone.hfut.edu.cn%2F&response_type=code&client_name=CasOAuthClient',
      },
    })
  }
  return (
    <Pressable onPress={onForgetOneHFUTPasswordPress}>
      <Text
        className={'text-primary font-bold text-xs underline self-end py-2'}
      >
        忘记信息门户密码了？点我去找回
      </Text>
    </Pressable>
  )
}
