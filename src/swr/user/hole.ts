import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import {
  GetUserFavoriteHoleListRequest,
  GetUserPostedHoleListRequest,
} from '@/request/apis/user'
import { useParams } from '@/shared/hooks/useParams'

export function useUserFavoriteHoleList() {
  const { userId } = useParams<{ userId: number }>()

  const key = [SWRKeys.user.favoriteHoleList, userId]

  const query = useInfiniteQuery(
    key,
    ({ pageParam = 1 }) =>
      GetUserFavoriteHoleListRequest({
        limit: 10,
        userId,
        page: pageParam,
      }),
    {
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
    },
  )

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

export function useUserPostedHoleList() {
  const { userId = undefined } = useParams<{ userId: number }>()
  const key = [SWRKeys.user.postedHoleList, userId, 1]

  const query = useInfiniteQuery(key, ({ pageParam = 1 }) =>
    GetUserPostedHoleListRequest({
      limit: 10,
      page: pageParam,
    }),
  )

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
