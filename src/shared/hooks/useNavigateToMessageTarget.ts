import { useHoleDetailRoute } from '@/shared/hooks/route/useHoleDetailRoute'
import { useReplyListRoute } from '@/shared/hooks/route/useReplyListRoute'
import { Toast } from '@/shared/utils/toast'
import { InteractionNotifyTargetType } from '@/shared/enums/notify.enum'
import { useUsedGoodsRoute } from '@/shared/hooks/route/useUsedGoodsRoute'

export type MessageAbleItem = (
  | INotifySystemListItem
  | INotifyInteractionListItem
  | IUserCommentListItem
) & {
  usedGoods?: INotifyInteractionListItem['usedGoods']
}

export function useNavigateToMessageTarget() {
  const { go } = useHoleDetailRoute()
  const { goDetail } = useUsedGoodsRoute()

  const onMessagePress = (data?: INotifyInteractionListItem) => {
    // 二手通知
    if (!data?.post && !data?.usedGoods) {
      return
    }

    if (data.target === InteractionNotifyTargetType.usedGoods) {
      goDetail(data.usedGoods?.id!, {
        commentId: data.comment?.id,
      })
      return
    }

    if ((data as INotifyInteractionListItem).type === 'reply') {
      if (!data.comment) {
        Toast.error({
          text1: '通知事件异常，请联系管理员处理',
        })
        return
      }

      go(data.post?.id, {
        commentId: data.comment?.id,
        replyId: data.reply?.id,
      })
      // goReplyList({
      //   commentId: data.comment?.id,
      //   replyId: data.reply?.id,
      //   holeId: data.post?.id,
      //   isMessageFrom: true,
      // })
      return
    }

    go(data!.post!.id, {
      commentId: data!.comment?.id,
    })
  }

  return {
    onMessagePress,
  }
}
