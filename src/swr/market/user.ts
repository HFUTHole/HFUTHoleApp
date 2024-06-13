import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'
import { Apis } from '@/request/apis'

export function useUsedGoodsUserPostedList() {
  const query = useBaseInfiniteQuery({
    queryKey: ['used-goods.user-posted'],
    queryFn: ({ pageParam = 1 }) => {
      return Apis.usedGoods.getUsedGoodsUserGoodsList({
        page: pageParam,
        limit: 10,
      })
    },
  })

  return {
    ...query,
  }
}
