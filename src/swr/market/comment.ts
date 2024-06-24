import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'
import { useParams } from '@/shared/hooks/useParams'
import { Apis } from '@/request/apis'
import { flatInfiniteQueryData, SWRKeys } from '@/swr/utils'

export const useGoodsCommentsQuery = () => {
  const params = useParams<{
    id: string
    commentId?: string
    replyId?: string
  }>()

  console.log(params)

  const query = useBaseInfiniteQuery({
    queryKey: ['goods.comments', params.id, params.commentId],
    queryFn: ({ pageParam = 1 }) => {
      return Apis.usedGoods.getUsedGoodsComment({
        id: params.id,
        page: pageParam,
        commentId: params.commentId,
        limit: 10,
      })
    },
  })

  const key = [
    SWRKeys.hole.comments,
    params.id,
    params?.commentId,
    params?.replyId,
  ]

  const addComments = (comments: IHoleCommentListItem[]) => {
    query.setData((input) => {
      input?.pages[0].items.unshift(...comments)
      return input!
    })
  }

  const { data: flattenData } = flatInfiniteQueryData<IHoleCommentListItem>(
    query.data,
  )

  const isDataEmpty = flattenData?.length > 0

  return {
    ...query,
    isDataEmpty,
    flattenData,
    addComments,
    key,
    params,
  }
}
