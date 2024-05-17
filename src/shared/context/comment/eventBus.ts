import { createStore } from 'hox'
import { useEventEmitter } from 'ahooks'

export const [useCommentEventBusContext, CommentEventBusProvider] = createStore(
  () => {
    const scrollEvent = useEventEmitter<number>()

    const addReplyEvent = useEventEmitter<{
      commentId: string
      data: IHoleReplyListItem
      parentReplyId?: string
    }>()

    return {
      scrollEvent,
      addReplyEvent,
    }
  },
)
