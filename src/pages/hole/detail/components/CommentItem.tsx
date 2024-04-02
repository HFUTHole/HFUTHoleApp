import {
  FlatList,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native'
import { TouchableRipple, useTheme } from 'react-native-paper'
import { useHoleComment } from '@/swr/hole'
import { useHoleDetailCommentContext } from '@/shared/context/hole_detail'
import React, { useEffect, useState } from 'react'
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
import { useBottomCommentContext } from '@/shared/context/hole/comment'
import { UserAvatar } from '@/components/UserAvatar'
import { EmojiableText } from '@/components/Text/EmojiableText'
import { TimeText } from '@/components/Text/Time'
import { Else, If, Then } from 'react-if'
import { useBoolean } from 'ahooks'
import { useCommentReplies } from '@/swr/hole/reply'
import { flatInfiniteQueryData } from '@/swr/utils'

const RenderItemReplyList: React.FC<{ data: IHoleCommentListItem }> = ({
  data,
}) => {
  const { openInput } = useBottomCommentContext()
  const [isExpand, isExpandActions] = useBoolean(false)

  const {
    fetchNextPage,
    data: replyData,
    isLoading,
  } = useCommentReplies({
    commentId: data.id,
    enabled: isExpand,
    replyId: data.replies?.[0].id,
  })

  const onExpandCommentAreaPress = () => {
    if (isExpand) {
    } else {
      isExpandActions.setTrue()
    }
  }

  const replies = [
    ...(data?.replies || []),
    ...(flatInfiniteQueryData(replyData).data || []),
  ] as Reply[]

  useEffect(() => {}, [data])

  return (
    <>
      <View>
        {replies.map((reply) => (
          <TouchableRipple
            onPress={() => {
              openInput({
                commentId: data.id,
                replyId: reply.id,
                body: reply.body,
                user: reply.user,
              })
            }}
          >
            <View className={'flex-row space-x-2 py-1'}>
              <UserAvatar url={reply.user.avatar} size={20} />
              <View className={'space-y-1'}>
                <View className={'flex-row h-[20px] items-center'}>
                  <Text className={'text-[#33333399]'}>
                    {reply.user.username}
                  </Text>
                  <If condition={!!reply.replyUser}>
                    <Then>
                      <Text className={'text-[#33333399] px-1'}>回复</Text>
                      <Text className={'text-[#33333399]'}>
                        {reply.replyUser?.username}
                      </Text>
                    </Then>
                  </If>
                </View>
                <View>
                  <EmojiableText body={reply.body} />
                </View>
                <Text>
                  <TimeText time={reply.createAt} />
                </Text>
              </View>
            </View>
          </TouchableRipple>
        ))}
        <View className={'mt-2 flex-row space-x-2 items-center'}>
          <View
            className={'rounded-full h-[0.5px]'}
            style={{
              width: 20,
              backgroundColor: 'rgba(51,51,51,0.4)',
            }}
          />
          <TouchableOpacity onPress={onExpandCommentAreaPress}>
            <Text className={'text-[#33333399] text-xs'}>
              <If condition={isExpand}>
                <Then>收起</Then>
                <Else>展开{data.repliesCount}条回复</Else>
              </If>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export const HoleDetailCommentItem: React.FC<{
  data: IHoleCommentListItem
  page: number
}> = ({ data, page }) => {
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
        onBodyPress={handleReply as any}
        bottom={data.replies?.length > 0 && <RenderItemReplyList data={data} />}
        deleteLikeRequest={DeleteCommentLikeRequest}
        onLikeRequest={LikeCommentRequest}
      />
    </View>
  )
}
