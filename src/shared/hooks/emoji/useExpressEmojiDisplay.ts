import { useCallback, useState } from 'react'
import { useSwitch } from '../useSwitch'
import { GestureResponderEvent } from 'react-native'
import { PostExpressEmojiRequest } from '@/request/apis/hole'
import { Toast } from '@/shared/utils/toast'

interface PPP {
  holeId: number
  commentId: string
  replyId: string
}

export const useExpressEmojiDisplay = (type: keyof PPP) => {
  const [popoverVisible, showPopover, hidePopover] = useSwitch(false)
  const [coordinateY, setCoordinateY] = useState(0)
  const [selectId, setSelectId] = useState<string | number>()

  const handleLongPress = useCallback(
    (e: GestureResponderEvent, id: number | string) => {
      setCoordinateY(e.nativeEvent.pageY)
      showPopover()
      setSelectId(id)
    },
    [showPopover]
  )

  const onEmojiPress = useCallback(
    async (emoji: string) => {
      hidePopover()
      const data = await PostExpressEmojiRequest({
        emoji,
        [type]: selectId,
      })
      Toast.success({
        text1: data.msg,
      })
    },
    [hidePopover, selectId, type]
  )

  return {
    popoverVisible,
    coordinateY,
    showPopover,
    hidePopover,
    onEmojiPress,
    handleLongPress,
  }
}
