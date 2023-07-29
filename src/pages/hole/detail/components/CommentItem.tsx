import { FlatList, TouchableNativeFeedback, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useHoleComment } from '@/swr/hole'
import { useHoleDetailCommentContext } from '@/shared/context/hole_detail'
import React from 'react'
import { PrimaryText } from '@/components/Text/PrimaryText'
import { RightIcon } from '@/components/icon'
import { useNavigation } from '@react-navigation/native'
import { useHoleDetailId } from '@/shared/hooks/useHoleDetailId'
import { CommentItem } from '@/pages/hole/components/CommentItem'
import {
  DeleteCommentLikeRequest,
  LikeCommentRequest,
} from '@/request/apis/hole'
import { ReplyBody } from '@/components/reply/body'
import { Empty } from '@/components/image/Empty'
import { useBottomCommentContext } from '@/shared/context/hole/comment'

const RenderItemReplyList: React.FC<{ data: IHoleCommentListItem }> = ({
  data,
}) => {
  const theme = useTheme()
  const navigate = useNavigation()
  const holeId = useHoleDetailId()

  // TODO 统一管理
  const navigateToReply = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigate.navigate('reply', {
      commentId: data.id,
      id: holeId,
      comment: data,
    })
  }

  return (
    <View
      className={'rounded-md p-3 grid space-y-2'}
      style={{ backgroundColor: theme.colors.background }}
    >
      {data.replies.map((reply) => (
        <View className={'flex flex-row flex-wrap'} key={reply.id}>
          <PrimaryText children={`${reply?.user?.username}：`} />
          <ReplyBody data={reply as IHoleReplyListItem} />
        </View>
      ))}
      <TouchableNativeFeedback onPress={navigateToReply}>
        <View className={'w-full py-1 flex flex-row items-center'}>
          <PrimaryText className={'text-xs'}>
            共有{data.repliesCount}条评论
          </PrimaryText>
          <RightIcon size={16} />
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

export const HoleDetailCommentItem: React.FC<{
  data: IHoleCommentListItem
  page: number
}> = ({ data, page }) => {
  const { setIsLiked } = useHoleComment()
  const { openInput } = useBottomCommentContext()

  const handleReply = (data: IHoleCommentListItem) => {
    openInput({
      commentId: data.id,
      ...(data as any),
    })
  }

  return (
    <View
      className={`grid space-y-2 ${data.isNotification && 'bg-surface/10'}`}
    >
      <CommentItem
        data={data}
        onBodyPress={handleReply}
        bottom={data.replies.length > 0 && <RenderItemReplyList data={data} />}
        reqFunc={data.isLiked ? DeleteCommentLikeRequest : LikeCommentRequest}
        onLikePress={() => setIsLiked(data, page)}
      />
    </View>
  )
}
