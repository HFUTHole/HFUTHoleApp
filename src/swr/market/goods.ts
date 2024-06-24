import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import { useParams } from '@/shared/hooks/useParams'
import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'
import { Apis } from '@/request/apis'
import { useBaseQuery } from '@/swr/useBaseQuery'

export function useUsedGoodsList() {
  const query = useBaseInfiniteQuery({
    queryKey: ['used-goods.list'],
    queryFn: ({ pageParam = 1 }) => {
      return Apis.usedGoods.getUsedGoodsList({
        page: pageParam,
        limit: 10,
      })
    },
  })

  return {
    ...query,
  }
}

export const useUsedGoodsDetailParams = () => {
  return useParams<{ id: string; commentId?: string }>()
}

interface Options {
  enabled?: boolean
}

export function useUsedGoodsDetail(options: Options = { enabled: true }) {
  const { id } = useUsedGoodsDetailParams()

  const query = useBaseQuery({
    enabled: options.enabled,
    queryKey: ['used-goods.detail', id],
    queryFn: () => {
      return Apis.usedGoods.getUsedGoodsDetail({
        id,
      })
    },
  })

  return {
    ...query,
  }
}
