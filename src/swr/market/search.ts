import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'
import { Apis } from '@/request/apis'
import { useParams } from '@/shared/hooks/useParams'
import { ISearchResultParams } from '@/pages/hole/search/result/result'
import { UsedGoodsSearchPriceType } from '@/request/apis/used-goods'

interface Options {
  area?: SchoolAreaEnum
  price?: UsedGoodsSearchPriceType
}

export function useUsedGoodsSearch(options: Options) {
  const params = useParams<ISearchResultParams>()

  const query = useBaseInfiniteQuery({
    queryKey: [
      'used-goods.search',
      options.price,
      options.area,
      params.keywords,
    ],
    queryFn: ({ pageParam = 1 }) => {
      return Apis.usedGoods.searchUsedGoods({
        keywords: params.keywords,
        ...options,
        page: pageParam,
        limit: 10,
      })
    },
  })

  return {
    ...query,
  }
}
