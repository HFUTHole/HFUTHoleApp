import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'
import { Apis } from '@/request/apis'

export function useUsedGoodsCollectListQuery() {
  const query = useBaseInfiniteQuery({
    queryKey: ['used-goods.collect'],
    queryFn: ({ pageParam = 1 }) => {
      return Apis.usedGoods.getUsedGoodsCollectedList({
        page: pageParam,
        limit: 10,
      })
    },
  })

  return {
    ...query,
  }
}
