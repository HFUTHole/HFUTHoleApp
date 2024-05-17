import { SWRKeys } from '@/swr/utils'
import { getInteractionNotificationsRequest } from '@/request/apis/notify'
import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'

export function useInteractiveNotificationsQuery() {
  const query = useBaseInfiniteQuery<INotifyInteractionListResponse>({
    queryKey: SWRKeys.notify.interaction,
    queryFn: ({ pageParam = 1 }) =>
      getInteractionNotificationsRequest({
        limit: 10,
        page: pageParam,
      }),
  })

  return {
    ...query,
  }
}
