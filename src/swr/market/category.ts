import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'
import {
  useCategoryParams,
  useUsedGoodsAreaParams,
} from '@/shared/hooks/route/useUsedGoodsRoute'
import { Apis } from '@/request/apis'
import { SchoolAreaEnum } from '@/shared/enums/school-area.enum'

interface Options {
  area: SchoolAreaEnum
}

export function useUsedGoodsCategoryORAreaQuery(options?: Options) {
  const { category } = useCategoryParams()

  const query = useBaseInfiniteQuery({
    queryKey: ['used-goods.category', category, options?.area],
    queryFn: ({ pageParam = 1 }) => {
      return Apis.usedGoods.getUsedGoodsCategoryOrAreaList({
        category,
        area: options?.area,
        page: pageParam,
        limit: 10,
      })
    },
  })

  return {
    ...query,
  }
}

export function useUsedGoodsAreaQuery() {
  const params = useUsedGoodsAreaParams()

  const query = useBaseInfiniteQuery({
    queryKey: ['used-goods.area', params.area],
    queryFn: ({ pageParam = 1 }) => {
      return Apis.usedGoods.getUsedGoodsCategoryOrAreaList({
        area: params.area,
        page: pageParam,
        limit: 10,
      })
    },
  })

  return {
    ...query,
  }
}
