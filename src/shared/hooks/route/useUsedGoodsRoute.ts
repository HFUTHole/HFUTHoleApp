import { useNavigation } from '@react-navigation/native'
import { useParams } from '@/shared/hooks/useParams'
import { SchoolAreaEnum } from '@/shared/enums/school-area.enum'

export function useUsedGoodsRoute() {
  const navigation = useNavigation()

  const goDetail = (id: string) => {
    // @ts-ignore
    navigation.push('market', {
      screen: 'detail',
      params: { id },
    })
  }

  const goCreate = () => {
    // @ts-ignore
    navigation.push('market', {
      screen: 'create',
    })
  }

  const goCategory = (category: string) => {
    // @ts-ignore
    navigation.push('market', {
      screen: 'category',
      params: { category },
    })
  }

  const goFavorite = () => {
    // @ts-ignore
    navigation.push('market', {
      screen: 'market-favorite',
    })
  }

  const goArea = (area: SchoolAreaEnum) => {
    // @ts-ignore
    navigation.push('market', {
      screen: 'area',
      params: { area },
    })
  }

  const goMy = () => {
    // @ts-ignore
    navigation.push('market', {
      screen: 'my',
    })
  }

  const goMyGoodsEditor = (id: string) => {
    // @ts-ignore
    navigation.push('market', {
      screen: 'my-goods-editor',
      params: { id },
    })
  }

  return {
    goDetail,
    goCreate,
    goCategory,
    goArea,
    goMy,
    goMyGoodsEditor,
    goFavorite,
  }
}

export const useCategoryParams = () => useParams<{ category?: string }>()

export const useUsedGoodsAreaParams = () =>
  useParams<{ area?: SchoolAreaEnum }>()
