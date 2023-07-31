import { useHoleDetailRoute } from '@/shared/hooks/route/useHoleDetailRoute'
import { useReplyListRoute } from '@/shared/hooks/route/useReplyListRoute'
import { Toast } from '@/shared/utils/toast'

export type MessageAbleItem =
  | INotifySystemListItem
  | INotifyInteractionListItem
  | IUserCommentListItem

export function useNavigateToMessageTarget() {
  const { go } = useHoleDetailRoute()
  const { go: goReplyList } = useReplyListRoute()

  const onMessagePress = (data?: MessageAbleItem) => {
    if (!data?.hole) {
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
    onMessagePress,
  }
}
