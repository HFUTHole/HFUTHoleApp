import { useParams } from '@/shared/hooks/useParams'
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import { GetHoleReplyRequest, SearchHoleRequest } from '@/request/apis/hole'
import { SWRKeys } from '@/swr/utils'
import { Updater } from 'react-query/types/core/utils'
import { HoleReplyListRouteParams } from '@/shared/types/interface/ReplyListRouteParams.interface'
import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'
import { Apis } from '@/request/apis'

interface Options {
  commentId: string

  enabled?: boolean

  /*
   * 过滤已经存在的回复
   * */
  replyId?: string
}

export const useCommentReplies = (options: Options) => {
  const { commentId, enabled, replyId } = options
  const key = [SWRKeys.hole.getCommentReply, 1, commentId]

  const query = useBaseInfiniteQuery({
    enabled,
    queryKey: key,
    queryFn: ({ pageParam = 1 }) => {
      return Apis.hole.GetHoleReplyRequest({
        limit: 10,
        page: pageParam,
        id: commentId,
        replyId,
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

  const addReply = (item: IHoleReplyListItem) => {
    query.setData((oldData) => {
      const pageLen = oldData?.pages.length || 0
      oldData?.pages[pageLen].items.push(item)
      return oldData!
    })
  }

  return {
    ...query,
    addReply,
  }
}

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
          (item) => item.id === data.id,
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
    params,
    comment,
    invalidAll,
    onRefresh,
    onTopRefresh,
    setIsLiked,
  }
}
