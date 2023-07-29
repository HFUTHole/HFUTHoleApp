import { useQuery } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import {
  getBaseNotificationsRequest,
  ReadNotificationType,
} from '@/request/apis/notify'
import { useMemo } from 'react'
import { useBaseQuery } from '@/swr/useBaseQuery'

export function useBaseNotificationsQuery() {
  const query = useBaseQuery<IGetBaseNotificationsResponse>({
    queryKey: SWRKeys.notify.base,
    queryFn: getBaseNotificationsRequest,
  })

  const { data } = query

  const totalCount = useMemo(() => {
    if (!query.data) {
      return 0
    }

    return (
      (data!.system?.totalCount || 0) + (data!.interaction?.totalCount || 0)
    )
  }, [data])

  const clearNotifications = async (target: ReadNotificationType) => {
    query.setData((oldData) => {
      if (oldData) {
        oldData[target] = null
      }

      return oldData!
    })
  }

  return {
    ...query,
    totalCount,
  }
}
