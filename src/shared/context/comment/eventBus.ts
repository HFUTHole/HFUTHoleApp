import { createStore } from 'hox'
import { useEventEmitter } from 'ahooks'

export const [useCommentEventBusContext, CommentEventBusProvider] = createStore(
  () => {
    const scrollEvent = useEventEmitter<number>()

    return {
      scrollEvent,
    }
  },
)
