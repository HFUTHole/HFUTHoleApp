import { useBaseQuery } from '@/swr/useBaseQuery'
import { SWRKeys } from '@/swr/utils'
import { Apis } from '@/request/apis'
import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'

export function useTagDetailSwr(tag: string) {
  const query = useBaseQuery({
    queryKey: [SWRKeys.hole.tagDetail, tag],
    queryFn: () => {
      return Apis.tag.getTagDetail(tag)
    },
  })

  return {
    ...query,
  }
}

export function useTagPostList(tag: string) {
  const query = useBaseInfiniteQuery({
    queryKey: [SWRKeys.hole.tagList, tag],
    queryFn: ({ pageParam = 1 }) => {
      return Apis.tag.getTagPostList({
        tag,
        limit: 10,
        page: pageParam,
      })
    },
  })

  return {
    ...query,
  }
}
