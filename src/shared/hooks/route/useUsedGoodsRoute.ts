import { useNavigation } from '@react-navigation/native'
import { useParams } from '@/shared/hooks/useParams'
import { SchoolAreaEnum } from '@/shared/enums/school-area.enum'

export function useUsedGoodsRoute() {
  const navigation = useNavigation()

  const goDetail = (id: string, params: { commentId?: string } = {}) => {
    // @ts-ignore
    navigation.push('market', {
      screen: 'detail',
      params: { id, ...params },
    })
  }

  const goCreate = (id: string, params?: { isEditable: boolean }) => {
    // @ts-ignore
    navigation.push('market', {
      screen: 'create',
      params: {
        id,
        ...params,
      },
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

  const goAllCategories = () => {
    // @ts-ignore
    navigation.push('market', {
      screen: 'all-categories',
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
    goAllCategories,
  }
}

export const useCategoryParams = () => useParams<{ category?: string }>()

export const useUsedGoodsAreaParams = () =>
  useParams<{ area?: SchoolAreaEnum }>()
