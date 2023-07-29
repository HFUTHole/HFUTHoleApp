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

export function useNavigateToNotificationTarget(
  data: INotifySystemListItem | INotifyInteractionListItem
) {
  const { go } = useHoleDetailRoute()
  const { go: goReplyList } = useReplyListRoute()

  const onNotificationPress = () => {
    if (!data.hole) {
      return
    }

    if ((data as INotifyInteractionListItem).type === 'reply') {
      if (!data.comment) {
        Toast.error({
          text1: '通知事件异常，请联系管理员处理',
        })
        return
      }

      goReplyList({
        commentId: data.comment?.id,
        replyId: data.reply?.id,
        holeId: data.hole?.id,
      })
      return
    }

    go(data!.hole!.id, {
      commentId: data!.comment?.id,
    })
  }

  return {
    onNotificationPress,
  }
}
