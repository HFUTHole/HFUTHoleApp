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
import React, { useEffect, useMemo, useState } from 'react'
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
import Animated, {
  FadeIn,
  FadeOut,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { LoadingIndicator } from '@/components/LoadingIndicator'

const RenderItemReplyList: React.FC<{ data: IHoleCommentListItem }> = ({
  data,
}) => {
  const { openInput } = useBottomCommentContext()
  const [isExpand, isExpandActions] = useBoolean(false)

  const {
    fetchNextPage,
    data: replyData,
    isLoading,
    hasNextPage,
  } = useCommentReplies({
    commentId: data.id,
    enabled: isExpand,
    replyId: data.replies?.[0].id,
  })

  const replies = useMemo<Reply[]>(() => {
    if (!isExpand) {
      return data?.replies || []
    }

    return [
      ...(data?.replies || []),
      ...(flatInfiniteQueryData(replyData).data || []),
    ] as Reply[]
  }, [data?.replies, replyData, isExpand])

  const onExpandCommentAreaPress = () => {
    if (isExpand) {
      if (hasNextPage) {
        fetchNextPage()
      } else {
        isExpandActions.setFalse()
      }
    } else {
      isExpandActions.setTrue()
    }
  }

  useEffect(() => {}, [data])

  return (
    <>
      <View>
        {replies.map((reply, index) => (
          <Animated.View entering={FadeIn} exiting={FadeOutUp} key={reply.id}>
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
                    <EmojiableText body={reply.body} fontSize={12} />
                  </View>
                  <Text>
                    <TimeText time={reply.createAt} />
                  </Text>
                </View>
              </View>
            </TouchableRipple>
          </Animated.View>
        ))}
        <View className={'mt-2 flex-row space-x-2 items-center'}>
          <View
            className={'rounded-full h-[0.5px]'}
            style={{
              width: 20,
              backgroundColor: 'rgba(51,51,51,0.4)',
            }}
          />
          <If condition={isLoading}>
            <Then>
              <LoadingIndicator color={'rgba(51,51,51,0.4)'} size={12} />
            </Then>
            <Else>
              <TouchableOpacity onPress={onExpandCommentAreaPress}>
                <Text className={'text-textSecondary text-xs'}>
                  <If condition={isExpand}>
                    <Then>
                      <If condition={hasNextPage}>
                        <Then>展开更多回复</Then>
                        <Else>收起</Else>
                      </If>
                    </Then>
                    <Else>展开{data.repliesCount}条回复</Else>
                  </If>
                </Text>
              </TouchableOpacity>
            </Else>
          </If>
          <TouchableOpacity onPress={isExpandActions.setFalse}>
            <If condition={isExpand && hasNextPage}>
              <Then>
                <Text className={'text-textSecondary text-xs'}>收起</Text>
              </Then>
            </If>
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
