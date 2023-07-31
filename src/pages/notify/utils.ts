import { useMutation } from 'react-query'
import {
  readAllNotificationRequest,
  ReadNotificationType,
} from '@/request/apis/notify'
import { useMount } from 'ahooks'
import { useBaseNotificationsQuery } from '@/swr/notify/useBaseNotifications'
import { useHoleDetailRoute } from '@/shared/hooks/route/useHoleDetailRoute'
import { useReplyListRoute } from '@/shared/hooks/route/useReplyListRoute'
import { Toast } from '@/shared/utils/toast'

export function useReadNotifications(type: ReadNotificationType) {
  const mutation = useMutation({
    mutationFn: () => readAllNotificationRequest(type),
  })
  const query = useBaseNotificationsQuery()

  useMount(() => {
    mutation.mutate()
    query.refetch()
  })
}
