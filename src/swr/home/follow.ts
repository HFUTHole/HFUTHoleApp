import { useBaseQuery } from '@/swr/useBaseQuery'
import { SWRKeys } from '@/swr/utils'
import { Apis } from '@/request/apis'
import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'

export function useHomeFollowListSwr() {
  const query = useBaseInfiniteQuery({
    queryKey: [SWRKeys.home.followList],
    queryFn: ({ pageParam = 1 }) =>
      Apis.hole.getHomeFollowList({
        limit: 10,
        page: pageParam,
      }),
  })

  return {
    ...query,
  }
}
