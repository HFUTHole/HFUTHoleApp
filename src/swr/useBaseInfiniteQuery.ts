import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQueryClient,
} from 'react-query'
import { Updater } from 'react-query/types/core/utils'
import { SetDataOptions } from 'react-query/types/core/types'
import { ListResponseAble } from '@/shared/types/utils'
import { flatInfiniteQueryData } from '@/swr/utils'
import { InferArrayItem } from '@/shared/types'

interface Options<T extends ListResponseAble>
  extends UseInfiniteQueryOptions<T> {}

export function useBaseInfiniteQuery<T extends ListResponseAble>(
  options: Options<T>
) {
  const query = useInfiniteQuery(options.queryKey!, options.queryFn!, {
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
    refetchOnMount: false,
    refetchOnReconnect: false,
    ...options,
  })

  const flattenData = flatInfiniteQueryData<InferArrayItem<T['items']>>(
    query.data
  )

  const client = useQueryClient()

  const invalidateQuery = async () => {
    client.setQueryData<InfiniteData<T>>(options.queryKey!, (oldData) => {
      // 确保刷新时只更换第一组数据，其他组的数据全都销毁
      oldData!.pages = oldData!.pages.slice(0, 1)
      return oldData!
    })
    await client.invalidateQueries(options.queryKey, {
      refetchPage: (lastPage, index) => index === 0,
    })
  }

  const setData = async <TData extends InfiniteData<T> = InfiniteData<T>>(
    updater: Updater<TData | undefined, TData>,
    setOptions?: SetDataOptions
  ) => {
    await client.setQueryData<TData>(options.queryKey!, updater, setOptions)
  }

  return {
    ...query,
    client,
    flattenData,
    invalidateQuery,
    setData,
  }
}
