import { useLinkTo, useNavigation } from '@react-navigation/native'

export function useHoleRoute() {
  const navigation = useNavigation()
  const linkTo = useLinkTo()

  const goTag = (params: { tag: string }) => {
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
