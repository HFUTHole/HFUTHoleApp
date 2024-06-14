import { useLinkTo, useNavigation } from '@react-navigation/native'

export function useHoleSearchRoute() {
  const navigation = useNavigation()
  const linkTo = useLinkTo()

  const goResult = (keywords?: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('hole', {
      screen: 'search',
      params: {
        screen: 'result',
        params: {
          keywords,
        },
      },
    })
  }

  const goIndex = () => {
    linkTo('/hole/search/index')
  }

  return {
    goResult,
    goIndex,
  }
}
