import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from 'react-query'
import { flatInfiniteQueryData, SWRKeys } from '@/swr/utils'
import {
  GetHoleDetailCommentsRequest,
  GetHoleDetailRequest,
  GetHoleListRequest,
  SearchHoleRequest,
} from '@/request/apis/hole'
import { useParams } from '@/shared/hooks/useParams'
import { useHoleDetailCommentContext } from '@/shared/context/hole_detail'
import { ISearchResultParams } from '@/pages/hole/search/result/result'
import { Updater } from 'react-query/types/core/utils'
import { AwaitAble } from '@/shared/types'
import { useUserProfile } from '@/swr/user/profile'
import { useId, useMemo } from 'react'
import { HoleListMode } from '@/shared/enums'
import { useRoute } from '@react-navigation/native'
import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'

// TODO 重构逻辑
export function useHoleList() {
  const route = useRoute()

  const mode = useMemo(() => {
    if (route.name === 'latest') {
      return HoleListMode.latest
    } else if (route.name === 'hot') {
      return HoleListMode.hot
    }
  }, [route])

  const key = [SWRKeys.hole.list, mode]

  const query = useBaseInfiniteQuery<IHoleListResponse>({
    queryKey: key,
    queryFn: ({ pageParam = 1 }) =>
      GetHoleListRequest({
        limit: 10,
        page: pageParam,
        mode: mode!,
      }),
  })

  return {
    ...query,
  }
}

export function useHoleDetail() {
  const params = useParams<{ id: number; holeId?: number }>()

  const client = useQueryClient()

  const key = [SWRKeys.hole.detail, params.id, params.holeId]

  const query = useQuery(key, {
    queryFn: () => GetHoleDetailRequest({ id: params.holeId || params.id }),
  })
  const invalidate = async () => {
    await client.invalidateQueries(key)
  }

  const toggleIsLike = async () => {
    client.setQueryData<IHoleDetailResponse>(key, (oldData) => {
      oldData!.isLiked = !oldData!.isLiked
      if (oldData!.isLiked) {
        oldData!.favoriteCounts++
      } else {
        oldData!.favoriteCounts--
      }

      return oldData!
    })
  }

  const setData = async <T = IHoleDetailResponse>(
    updater: Updater<T | undefined, T>
  ) => {
    await client.setQueryData<IHoleDetailResponse>(key, updater as any)
  }

  return {
    ...query,
    invalidate,
    toggleIsLike,
    setData,
  }
}

export function useHoleComment() {
  const params = useParams<{ id: number; commentId?: string }>()
  const { mode, order } = useHoleDetailCommentContext()
  const user = useUserProfile()
  const id = useId()

  const key = [SWRKeys.hole.comments, params.id, params?.commentId, mode, order]

  const query = useInfiniteQuery<IHoleCommentListResponse>(key, {
    queryFn: ({ pageParam = 1 }) => {
      return GetHoleDetailCommentsRequest({
        limit: 10,
        page: pageParam,
        id: params.id,
        mode,
        order,
        commentId: params.commentId,
      })
    },
    getNextPageParam: (lastPages) => {
      const nextPage = lastPages.meta.currentPage + 1

      if (
        nextPage > lastPages.meta.totalPages ||
        lastPages.items.length === 0
      ) {
        return
      }

      return nextPage
    },
    refetchOnMount: true,
    staleTime: 0,
  })

  const { data: flattenData } = useMemo(() => {
    return flatInfiniteQueryData<IHoleCommentListItem>(query.data)
  }, [query.data])

  const isDataEmpty = flattenData?.length > 0

  const client = useQueryClient()

  const invalidateQuery = async (onlyFirstGroup = true) => {
    client.setQueryData<InfiniteData<IHoleListResponse>>(key, (oldData) => {
      if (onlyFirstGroup) {
        // 确保刷新时只更换第一组数据，其他组的数据全都销毁
        oldData!.pages = oldData!.pages.slice(0, 1)
      }
      return oldData!
    })
    await client.invalidateQueries(key, {
      refetchPage: (lastPage, index) => index === 0,
    })
  }

  const invalidAll = async () => {
    await client.invalidateQueries(key)
  }

  const setData = async <T = InfiniteData<IHoleCommentListResponse>>(
    updater: Updater<T | undefined, T>
  ) => {
    await client.setQueryData<InfiniteData<IHoleCommentListResponse>>(
      key,
      updater as any
    )
  }

  const setTargetData = async (
    data: IHoleCommentListItem,
    pageIndex = 0,
    func: (target: IHoleCommentListItem) => AwaitAble
  ) => {
    await setData((oldData) => {
      const pageTarget = oldData?.pages?.[pageIndex]

      if (pageTarget) {
        const targetIndex = pageTarget.items.findIndex(
          (item) => item.id === data.id
        )

        if (targetIndex !== -1) {
          const target = pageTarget.items[targetIndex]

          func(target)
        }
      }

      return oldData!
    })
  }

  const setIsLiked = async (data: IHoleCommentListItem, pageIndex = 0) => {
    await setTargetData(data, pageIndex, (target) => {
      target.isLiked = !target.isLiked

      if (target.isLiked) {
        target.favoriteCounts++
      } else {
        target.favoriteCounts--
      }
    })
  }

  const setReply = async (
    data: IHoleCommentListItem,
    pageIndex = 0,
    body: string
  ) => {
    await setTargetData(data, pageIndex, (target) => {
      target.replies.push({
        createAt: '',
        favoriteCounts: 0,
        replyUser: null,
        id,
        body,
        user: user.data!,
      })

      target.repliesCount++
    })
  }

  return {
    ...query,
    invalidAll,
    invalidateQuery,
    isDataEmpty,
    setData,
    setIsLiked,
    setTargetData,
    setReply,
    flattenData,
  }
}

export function useHoleSearchResult() {
  const params = useParams<ISearchResultParams>()

  const key = params.keywords

  const query = useInfiniteQuery(key, {
    queryFn: ({ pageParam = 1 }) => {
      return SearchHoleRequest({
        limit: 10,
        page: pageParam,
        keywords: key,
      })
    },
    getNextPageParam: (lastPages) => {
      const nextPage = lastPages.meta.currentPage + 1

      if (
        nextPage > lastPages.meta.totalPages ||
        lastPages.items.length === 0
      ) {
        return
      }

      return nextPage
    },
    refetchOnMount: true,
  })

  const client = useQueryClient()

  const invalidateQuery = async (onlyFirstGroup = true) => {
    client.setQueryData<InfiniteData<IHoleListResponse>>(key, (oldData) => {
      if (onlyFirstGroup) {
        // 确保刷新时只更换第一组数据，其他组的数据全都销毁
        oldData!.pages = oldData!.pages.slice(0, 1)
      }
      return oldData!
    })
    await client.invalidateQueries(key, {
      refetchPage: (lastPage, index) => index === 0,
    })
  }

  return {
    ...query,
    invalidateQuery,
  }
}
