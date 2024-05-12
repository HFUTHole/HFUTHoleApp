import { View } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { UserText } from '@/components/Text/User'
import { TimeText } from '@/components/Text/Time'
import React, { ReactNode } from 'react'
import { AwaitAble } from '@/shared/types'
import { useMutation, UseMutationResult } from 'react-query'
import { ReplyBody } from '@/components/reply/body'
import { ImageList } from '@/components/image/ImageList'
import { ReportType } from '@/shared/validators/report'
import { CommentReplyBottomAction } from '@/pages/hole/components/sheet/CommentReplyBottomAction'
import { TouchableRipple, useTheme } from 'react-native-paper'
import { AnimatedLikeButton } from '@/components/animation/LikeButton'

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
}

// TODO 解决 any 类型
export function CommentItem({
  data,
  bottom,
  onBodyPress,
  isReply,
  deleteLikeRequest,
  onLikeRequest,
}: Props) {
  const mutation = useMutation({
    mutationFn: (isLiked: boolean) =>
      isLiked
        ? deleteLikeRequest({ id: data.id })
        : onLikeRequest({ id: data.id }),
  })

  return (
    <TouchableRipple onPress={() => onBodyPress?.(data)} className={'px-3'}>
      <View
        className={`flex flex-row space-x-2 rounded-lg border-b-[1px] py-2 border-black/5`}
        key={data.id}
      >
        <View>
          <View className={'w-full flex flex-row items-center space-x-2'}>
            <View className={'w-1/12'}>
              <UserAvatar url={data.user?.avatar} size={30} />
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
              </View>
              <View className={'justify-between flex-row items-center'}>
                <TimeText time={data.createAt} />
                <CommentItemIsLike mutation={mutation} data={data} />
              </View>
              {bottom && <View className={'py-2'}>{bottom}</View>}
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
  return <AnimatedLikeButton data={data} mutation={mutation} />
}
