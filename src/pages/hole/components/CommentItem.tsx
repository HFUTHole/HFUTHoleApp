import { Pressable, View } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { UserText } from '@/components/Text/User'
import { TimeText } from '@/components/Text/Time'
import React, { ReactNode } from 'react'
import { AwaitAble, AwaitFunc } from '@/shared/types'
import { LikeIcon } from '@/components/icon'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { useMutation } from 'react-query'
import { ReplyBody } from '@/components/reply/body'
import { ImageList } from '@/components/image/ImageList'
import { ReportType } from '@/shared/validators/report'
import { CommentReplyBottomAction } from '@/pages/hole/components/sheet/CommentReplyBottomAction'
import { TouchableRipple } from 'react-native-paper'

type Data =
  | (Omit<IHoleCommentListItem, 'replies' | 'repliesCount'> &
      Partial<Pick<IHoleCommentListItem, 'replies' | 'isNotification'>>)
  | IHoleReplyListItem

interface Props {
  data: Data
  reqFunc: AwaitFunc
  bottom?: ReactNode
  selectable?: boolean
  onBodyPress?: (data: Data) => AwaitAble<void>
  onLikePress?: () => AwaitAble
  onLikeSuccess?: () => AwaitAble
  isReply?: boolean
}

// TODO 解决 any 类型
export function CommentItem({
  data,
  bottom,
  onBodyPress,
  reqFunc,
  onLikePress,
  onLikeSuccess,
  isReply,
}: Props) {
  const mutation = useMutation({
    mutationFn: () => reqFunc({ id: data.id }),
    onSuccess: onLikeSuccess,
  })

  const onLikeIconPress = () => {
    mutation.mutate()
    onLikePress?.()
  }

  return (
    <TouchableRipple onPress={() => onBodyPress?.(data)} className={'px-3'}>
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
              <View className={'flex space-y-2'}>
                <UserText username={data.user.username} />
                <TimeText time={data.createAt} />
              </View>
              <View>
                <CommentReplyBottomAction
                  type={isReply ? ReportType.reply : ReportType.comment}
                  data={data as any}
                />
              </View>
            </View>
          </View>
          <View className={'flex flex-row space-x-2'}>
            <View className={'w-1/12'} />
            <View className={'w-10/12 grid space-y-2'}>
              <View className={'grid space-y-2'}>
                <ImageList imgs={data.imgs} />
                <ReplyBody data={data as IHoleReplyListItem} />
              </View>
              <View className={'flex flex-row items-center space-x-1 py-2'}>
                <LikeIcon
                  active={data.isLiked}
                  size={16}
                  onPress={onLikeIconPress}
                />
                <View>
                  <SecondaryText style={{ fontSize: 14 }}>
                    {data.favoriteCounts}
                  </SecondaryText>
                </View>
              </View>
              <View>{bottom}</View>
            </View>
          </View>
        </View>
      </View>
    </TouchableRipple>
  )
}
