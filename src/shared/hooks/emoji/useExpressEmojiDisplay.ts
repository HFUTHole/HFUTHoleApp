import { useCallback, useRef, useState } from 'react'
import { useSwitch } from '../useSwitch'
import { GestureResponderEvent } from 'react-native'
import { PostExpressEmojiRequest } from '@/request/apis/hole'
import { Toast } from '@/shared/utils/toast'
import { useMutation } from 'react-query'
import { useHoleList } from '@/swr/hole'
import { useHoleComment, useHoleDetail } from '@/swr/hole'
import { useHoleReplyList } from '@/swr/hole/reply'
import { useUserProfile } from '@/swr/user/profile'

export const useExpressEmojiDisplay = (
  type: 'holeId' | 'commentId' | 'replyId'
) => {
  const [popoverVisible, showPopover, hidePopover] = useSwitch(false)
  // pageY
  const [coordinateY, setCoordinateY] = useState(0)
  const [selectId, setSelectId] = useState<string | number>()
  const { data: userProfile } = useUserProfile()

  const mutation = useMutation({
    mutationFn: PostExpressEmojiRequest,
    retry: false,
    onSuccess(data) {
      Toast.success({
        text1: data.msg,
      })
    },
  })

  const handleLongPress = useCallback(
    (e: GestureResponderEvent, id: number | string) => {
      setCoordinateY(e.nativeEvent.pageY)
      showPopover()
      setSelectId(id)
    },
    [showPopover]
  )

  const onEmojiPress = useCallback(
    (emoji: string) => {
      hidePopover()
      mutation.mutate({
        emoji,
        [type]: selectId,
      })
    },
    [hidePopover, mutation, selectId, type]
  )

  return {
    popoverVisible,
    coordinateY,
    userProfile,
    selectId,
    showPopover,
    hidePopover,
    onEmojiPress,
    handleLongPress,
  }
}

function handleExpressEmoji(
  entry: { expressEmojis: ExpressEmoji[] },
  emoji: string,
  userProfile: IUserProfile | undefined
) {
  const expressEmoji = entry!.expressEmojis.find((item) => item.emoji === emoji)

  // emoji 项不存在，直接添加
  if (!expressEmoji) {
    entry!.expressEmojis.push({
      // 为了兼容数据，随便搞的id
      id: userProfile!.id + userProfile!.username,
      emoji,
      users: [
        {
          avatar: userProfile!.avatar,
          id: userProfile!.id,
          username: userProfile!.username,
        },
      ],
    })
    return
  }

  // 处理 user 是否存在 expressEmoji 中
  const userIndex = expressEmoji.users.findIndex(
    (item) => item.id === userProfile!.id
  )
  if (userIndex > -1) {
    // users 数组只有一项，需要将 expressEmoji 删除
    if (expressEmoji.users.length === 1) {
      entry!.expressEmojis.splice(
        entry!.expressEmojis.findIndex((item) => item.emoji === emoji)
      )
    } else {
      expressEmoji.users.splice(userIndex, 1)
    }
  } else {
    // user 不存在，直接添加
    expressEmoji.users.push({
      avatar: userProfile!.avatar,
      id: userProfile!.id,
      username: userProfile!.username,
    })
  }
}

export const useHoleExpressEmojiDisplay = () => {
  const {
    onEmojiPress: originOnEmojiPress,
    userProfile,
    ...rest
  } = useExpressEmojiDisplay('holeId')
  const { setData } = useHoleList()
  const { selectId } = rest

  const setCachData = useCallback(
    (emoji: string) => {
      setData((oldData) => {
        if (!oldData?.pages || !userProfile) {
          return oldData!
        }

        let hole
        for (const page of oldData?.pages) {
          for (const item of page.items) {
            item.id === selectId && (hole = item)
          }
        }

        handleExpressEmoji(hole!, emoji, userProfile)

        return oldData!
      })
    },
    [selectId, setData, userProfile]
  )

  const onEmojiPress = useCallback(
    (emoji: string) => {
      originOnEmojiPress(emoji)
      setCachData(emoji)
    },
    [originOnEmojiPress, setCachData]
  )

  return {
    ...rest,
    onEmojiPress,
  }
}

export const useCommentExpressEmojiDisplay = () => {
  const {
    onEmojiPress: originOnEmojiPress,
    userProfile,
    ...rest
  } = useExpressEmojiDisplay('commentId')
  const { setData } = useHoleComment()
  const { selectId } = rest

  const setCachData = useCallback(
    (emoji: string) => {
      setData((oldData) => {
        if (!oldData?.pages || !userProfile) {
          return oldData!
        }

        let comment
        for (const page of oldData?.pages) {
          for (const item of page.items) {
            item.id === selectId && (comment = item)
          }
        }

        handleExpressEmoji(comment!, emoji, userProfile)

        return oldData!
      })
    },
    [selectId, setData, userProfile]
  )

  const onEmojiPress = useCallback(
    (emoji: string) => {
      originOnEmojiPress(emoji)
      setCachData(emoji)
    },
    [originOnEmojiPress, setCachData]
  )

  return {
    ...rest,
    onEmojiPress,
  }
}

export const useReplyExpressEmojiDisplay = () => {
  const {
    onEmojiPress: originOnEmojiPress,
    userProfile,
    ...rest
  } = useExpressEmojiDisplay('replyId')
  const { setData } = useHoleReplyList()
  const { selectId } = rest

  const setCachData = useCallback(
    (emoji: string) => {
      setData((oldData) => {
        if (!oldData?.pages || !userProfile) {
          return oldData!
        }

        let reply
        for (const page of oldData?.pages) {
          for (const item of page.items) {
            item.id === selectId && (reply = item)
          }
        }

        handleExpressEmoji(reply!, emoji, userProfile)

        return oldData!
      })
    },
    [selectId, setData, userProfile]
  )

  const onEmojiPress = useCallback(
    (emoji: string) => {
      originOnEmojiPress(emoji)
      setCachData(emoji)
    },
    [originOnEmojiPress, setCachData]
  )

  return {
    ...rest,
    onEmojiPress,
  }
}
