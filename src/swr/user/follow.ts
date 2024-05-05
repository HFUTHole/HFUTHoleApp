import { useBaseQuery } from '@/swr/useBaseQuery'
import { SWRKeys } from '@/swr/utils'
import { Apis } from '@/request/apis'

export function useIsFollowedQuery(userId: number) {
  return useBaseQuery({
    queryKey: [SWRKeys.user.isFollowed, userId],
    queryFn: () => {
      return Apis.user.isUserFollowedRequest({
        userId,
      })
    },
  })
}
