import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'
import { Apis } from '@/request/apis'
import { GetUserUsedGoodsListType } from '@/request/apis/used-goods'

interface Options {
  type: GetUserUsedGoodsListType
}

export function useUsedGoodsUserPostedList(options: Options = {} as Options) {
  const { type = 'posted' } = options

  const query = useBaseInfiniteQuery({
    queryKey: ['used-goods.user-posted', type],
    queryFn: ({ pageParam = 1 }) => {
      return Apis.usedGoods.getUsedGoodsUserGoodsList({
        page: pageParam,
        limit: 10,
        type,
      })
    },
  })

  const removeGoods = (id: string) => {
    query.setData((draft) => {
      return draft!.pages.map((page) => {
        return {
          ...page,
          items: page.items.filter((item) => item.id !== id),
        }
      })
    })
  }

  return {
    ...query,
    removeGoods,
  }
}
