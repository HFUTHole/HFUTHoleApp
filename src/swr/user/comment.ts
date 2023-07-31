import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'
import { SWRKeys } from '@/swr/utils'
import { GetUserCommentListRequest } from '@/request/apis/user'

export function useUserCommentsListQuery() {
  const query = useBaseInfiniteQuery({
    queryKey: SWRKeys.user.postedCommentList,
    queryFn: GetUserCommentListRequest,
  })

  return {
    ...query,
  }
}
