import { useNavigation } from '@react-navigation/native'

export function useUsedGoodsRoute() {
  const navigation = useNavigation()

  const goDetail = (id: string) => {
    // @ts-ignore
    navigation.navigate('market', {
      screen: 'detail',
      params: { id },
    })
  }

  return {
    goDetail,
  }
}
