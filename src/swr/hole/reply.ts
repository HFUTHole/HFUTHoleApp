import { useParams } from '@/shared/hooks/useParams'
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import { GetHoleReplyRequest, SearchHoleRequest } from '@/request/apis/hole'
import { SWRKeys } from '@/swr/utils'
import { Updater } from 'react-query/types/core/utils'
import { HoleReplyListRouteParams } from '@/shared/types/interface/ReplyListRouteParams.interface'
import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'

export const useHoleReplyList = () => {
  const params = useParams<HoleReplyListRouteParams>()

  const key = [SWRKeys.hole.getCommentReply, params.commentId, params.replyId]

  const query = useBaseInfiniteQuery({
    queryKey: key,
    queryFn: ({ pageParam = 1 }) => {
      return GetHoleReplyRequest({
        limit: 10,
        page: pageParam,
        id: params.commentId,
        replyId: params.replyId,
      })
    },
    getNextPageParam: (lastPages) => {
      const nextPage = lastPages.meta.currentPage + 1

      if (nextPage > lastPages.meta.totalPages) {
        return
      }

      return nextPage
    },
    refetchOnMount: true,
  })

  const comment = query.data?.pages?.[0]?.comment

  const client = useQueryClient()

  const invalidAll = async () => {
    await client.invalidateQueries(key)
  }

  const onRefresh = async () => {
    await query.fetchNextPage()
  }

  const onTopRefresh = async () => {
    await Promise.all([await query.refetch()])
  }

  const setIsLiked = async (data: IHoleReplyListItem, pageIndex = 0) => {
    await query.setData((oldData) => {
      const pageTarget = oldData?.pages?.[pageIndex]

      if (pageTarget) {
        const targetIndex = pageTarget.items.findIndex(
          (item) => item.id === data.id
        )

        if (targetIndex !== -1) {
          const target = pageTarget.items[targetIndex]

          target.isLiked = !target.isLiked

          if (target.isLiked) {
            target.favoriteCounts++
          } else {
            target.favoriteCounts--
          }
        }
      }

      return oldData!
    })
  }

  return {
    ...query,
    comment,
    invalidAll,
    onRefresh,
    onTopRefresh,
    setIsLiked,
  }
}
