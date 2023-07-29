import { useNavigation } from '@react-navigation/native'
import { HoleReplyListRouteParams } from '@/shared/types/interface/ReplyListRouteParams.interface'

export function useReplyListRoute() {
  const navigation = useNavigation()

  const go = (params: HoleReplyListRouteParams) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('hole', {
      screen: 'detail',
      params: {
        screen: 'reply',
        params,
      },
    })
  }

  return {
    go,
  }
}
