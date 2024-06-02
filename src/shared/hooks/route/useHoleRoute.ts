import { useLinkTo, useNavigation } from '@react-navigation/native'

export function useHoleRoute() {
  const navigation = useNavigation()
  const linkTo = useLinkTo()

  const goTag = (params: { tag: string }) => {
    if (params.tag === '淘二手') {
      // @ts-ignore
      navigation.navigate('market', {
        screen: 'market-index',
      })
      return;
    }
    // @ts-ignore
    navigation.navigate('hole', {
      screen: 'tag',
      params,
    })
  }

  return {
    goTag,
  }
}
