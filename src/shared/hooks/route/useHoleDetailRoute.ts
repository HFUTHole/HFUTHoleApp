import { useNavigation } from '@react-navigation/native'

export function useHoleDetailRoute() {
  const navigation = useNavigation()

  const go = (
    id: number,
    params?: { commentId?: string; replyId?: string },
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('hole', {
      screen: 'detail',
      params: {
        screen: 'index',
        params: {
          id,
          ...params,
        },
      },
    })
  }

  const goTagDetail = (
    id: number,
    params?: { commentId?: string; replyId?: string },
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('hole', {
      screen: 'tag-detail',
      params: {
        id,
        ...params,
      },
    })
  }

  return {
    go,
    goTagDetail,
  }
}
