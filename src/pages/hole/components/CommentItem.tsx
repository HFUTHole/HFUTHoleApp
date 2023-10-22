import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { UserText } from '@/components/Text/User'
import { TimeText } from '@/components/Text/Time'
import React, { ReactNode, useCallback, useState } from 'react'
import { AwaitAble, AwaitFunc } from '@/shared/types'
import { useMutation, UseMutationResult } from 'react-query'
import { ReplyBody } from '@/components/reply/body'
import { ImageList } from '@/components/image/ImageList'
import { ReportType } from '@/shared/validators/report'
import { CommentReplyBottomAction } from '@/pages/hole/components/sheet/CommentReplyBottomAction'
import { TouchableRipple, useTheme } from 'react-native-paper'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { ExpressEmojiDisplay } from '@/components/emoji/ExpressEmojiDisplay'

type Data =
  | (Omit<IHoleCommentListItem, 'replies' | 'repliesCount'> &
      Partial<Pick<IHoleCommentListItem, 'replies' | 'isNotification'>>)
  | IHoleReplyListItem

interface Props {
  data: Data
  bottom?: ReactNode
  selectable?: boolean
  onBodyPress?: (data: Data) => AwaitAble<void>
  onLikePress?: () => AwaitAble
  isReply?: boolean
  deleteLikeRequest: (data: { id: string }) => AwaitAble
  onLikeRequest: (data: { id: string }) => AwaitAble
  onLongPress?: (e: GestureResponderEvent) => void
}

// TODO 解决 any 类型
export function CommentItem({
  data,
  bottom,
  onBodyPress,
  isReply,
  deleteLikeRequest,
  onLikeRequest,
  onLongPress,
}: Props) {
  const mutation = useMutation({
    mutationFn: (isLiked: boolean) =>
      isLiked
        ? deleteLikeRequest({ id: data.id })
        : onLikeRequest({ id: data.id }),
  })

  return (
    <TouchableRipple
      onPress={() => onBodyPress?.(data)}
      delayLongPress={2000}
      onLongPress={onLongPress}
      className={'px-3'}
    >
      <View
        className={`flex flex-row space-x-2 rounded-lg border-b-[1px] py-2 border-black/5`}
        key={data.id}
      >
        <View>
          <View className={'w-full flex flex-row items-center space-x-2'}>
            <View className={'w-1/12'}>
              <UserAvatar url={data.user.avatar} size={30} />
            </View>
            <View
              className={'flex flex-row justify-between w-11/12 items-center'}
            >
              <UserText username={data.user.username} />
              <View>
                <CommentReplyBottomAction
                  type={isReply ? ReportType.reply : ReportType.comment}
                  data={data as any}
                />
              </View>
            </View>
          </View>
          <View className={'flex flex-row space-x-2 mt-[-10]'}>
            <View className={'w-1/12'} />
            <View className={'w-10/12 grid space-y-1'}>
              <View>
                <ImageList imgs={data.imgs} />
                <ReplyBody data={data as IHoleReplyListItem} />
                <ExpressEmojiDisplay data={data.expressEmojis} />
              </View>
              <View className={'justify-between flex-row items-center'}>
                <TimeText time={data.createAt} />
                <CommentItemIsLike mutation={mutation} data={data} />
              </View>
              <View>{bottom}</View>
            </View>
          </View>
        </View>
      </View>
    </TouchableRipple>
  )
}

const CommentItemIsLike: React.FC<{
  data: Data
  mutation: UseMutationResult<unknown, unknown, boolean, unknown>
}> = ({ mutation, data }) => {
  const theme = useTheme()
  const [liked, setLiked] = useState(data.isLiked)
  const [favoriteCount, setFavoriteCount] = useState(data.favoriteCounts)

  const likedInput = useDerivedValue(() => withSpring(liked ? 1 : 0), [liked])

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            likedInput.value,
            [0, 1],
            [1, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    }
  })

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: likedInput.value,
        },
      ],
      opacity: likedInput.value,
    }
  })

  const onLikeIconPress = useCallback(() => {
    setLiked((prev) => !prev)
    setFavoriteCount((prev) => (liked ? prev - 1 : prev + 1))
    mutation.mutate(liked, {
      onError() {
        setFavoriteCount((prev) => prev - 1)
      },
    })
  }, [liked, mutation])

  return (
    <Pressable onPress={onLikeIconPress}>
      <View className={'flex-row items-center p-2 mb-[-6]'}>
        <View className={'relative p-2 flex-row'}>
          <Animated.View
            className={'flex-row space-x-1 items-center'}
            style={[StyleSheet.absoluteFillObject, outlineStyle]}
          >
            <MaterialCommunityIcons
              name={'heart-outline'}
              size={16}
              color={theme.colors.surfaceVariant}
            />
          </Animated.View>
          <Animated.View
            className={'flex-row space-x-1 items-center'}
            style={[StyleSheet.absoluteFillObject, fillStyle]}
          >
            <MaterialCommunityIcons
              name={'heart'}
              size={16}
              color={theme.colors.error}
            />
          </Animated.View>
        </View>
        <SecondaryText variant={'bodySmall'}>{favoriteCount}</SecondaryText>
      </View>
    </Pressable>
  )
}
