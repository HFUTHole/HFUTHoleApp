import React, { useEffect, useMemo } from 'react'
import { useBottomCommentContext } from '@/shared/context/hole/comment'
import { useBoolean } from 'ahooks'
import { useCommentReplies } from '@/swr/hole/reply'
import { flatInfiniteQueryData } from '@/swr/utils'
import { Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeOutUp } from 'react-native-reanimated'
import { TouchableRipple } from 'react-native-paper'
import { UserAvatar } from '@/components/UserAvatar'
import { Else, If, Then } from 'react-if'
import { EmojiableText } from '@/components/Text/EmojiableText'
import { TimeText } from '@/components/Text/Time'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { useMutation, UseMutationResult } from 'react-query'
import { AnimatedLikeButton } from '@/components/animation/LikeButton'
import { DeleteReplyLikeRequest, LikeReplyRequest } from '@/request/apis/hole'
import { useCommentEventBusContext } from '@/shared/context/comment/eventBus'
import { CommentImage } from '@/pages/hole/detail/components/CommentImage'
import * as _ from 'lodash'

const ReplyListItem: React.FC<{
  reply: Reply
  comment: IHoleCommentListItem
}> = (props) => {
  const { reply, comment } = props
  const { openInput } = useBottomCommentContext()

  const mutation = useMutation({
    mutationKey: [reply.id, reply.isLiked],
    mutationFn: (liked: boolean) => {
      const fn = liked ? DeleteReplyLikeRequest : LikeReplyRequest

      return fn({
        id: reply.id,
      })
    },
  })

  return (
    <Animated.View entering={FadeIn} exiting={FadeOutUp} key={reply.id}>
      <TouchableRipple
        onPress={() => {
          openInput({
            commentId: comment.id,
            replyId: reply.id,
            body: reply.body,
            user: reply.user,
          })
        }}
      >
        <View className={'flex-row space-x-2 py-1'}>
          <UserAvatar
            url={reply.user?.avatar}
            userId={reply.user?.id}
            size={20}
          />
          <View className={'flex-1 space-y-1'}>
            <View className={'flex-row h-[20px] items-center'}>
              <Text className={'text-[#33333399]'}>{reply.user?.username}</Text>
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
              <EmojiableText
                numberOfLines={2}
                body={reply.body}
                fontSize={12}
              />
              <If condition={!!reply.imgs?.length}>
                <Then>
                  <View className={'my-1'}>
                    <CommentImage data={reply as IHoleReplyListItem} />
                  </View>
                </Then>
                <Else>
                  <></>
                </Else>
              </If>
            </View>
            <View
              className={'items-center flex-row justify-between pr-[2.5vw]'}
            >
              <View className={'flex-1'}>
                <TimeText time={reply.createAt} />
              </View>
              <ReplyItemLikeButton data={reply} mutation={mutation} />
            </View>
          </View>
        </View>
      </TouchableRipple>
    </Animated.View>
  )
}

export const ReplyList: React.FC<{ data: IHoleCommentListItem }> = ({
  data,
}) => {
  const [isExpand, isExpandActions] = useBoolean(false)

  const { addReplyEvent } = useCommentEventBusContext()

  const {
    fetchNextPage,
    data: replyData,
    isLoading,
    hasNextPage,
    addReply,
    refetch,
  } = useCommentReplies({
    commentId: data?.id,
    enabled: isExpand,
    replyId: data?.replies?.[0]?.id,
  })

  addReplyEvent.useSubscription((payload) => {
    const { commentId, parentReplyId } = payload

    if (commentId !== data.id) {
      return
    }

    if (!replyData?.pages?.length) {
      refetch()
      isExpandActions.setTrue()
      return
    }

    addReply(payload.data, parentReplyId)
  })

  const replies = !isExpand
    ? data.replies || []
    : ([
        ...(data?.replies || []),
        ...(flatInfiniteQueryData(replyData).data || []),
      ] as Reply[])

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
      <If condition={replies.length > 0}>
        <Then>
          <View>
            {_.uniqBy(replies, 'id').map((reply, index) => (
              <ReplyListItem reply={reply} comment={data} key={reply.id} />
            ))}
            <View className={'mt-2 flex-row space-x-2 items-center'}>
              <View
                className={'rounded-full h-[0.5px]'}
                style={{
                  width: 20,
                  backgroundColor: 'rgba(51,51,51,0.4)',
                }}
              />
              <View className={'flex-row items-center'}>
                <If condition={isLoading}>
                  <Then>
                    <LoadingIndicator color={'rgba(51,51,51,0.4)'} size={12} />
                  </Then>
                  <Else>
                    <TouchableOpacity
                      className={'w-[50%] py-1'}
                      onPress={onExpandCommentAreaPress}
                    >
                      <Text className={'text-textSecondary text-[13px]'}>
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
                <TouchableOpacity
                  className={'w-[50%]'}
                  onPress={isExpandActions.setFalse}
                >
                  <If condition={isExpand && hasNextPage}>
                    <Then>
                      <Text className={'ml-4 text-textSecondary text-[13px]'}>
                        收起
                      </Text>
                    </Then>
                  </If>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Then>
      </If>
    </>
  )
}

const ReplyItemLikeButton: React.FC<{
  data: Reply

  mutation: UseMutationResult<unknown, unknown, boolean, unknown>
}> = ({ mutation, data }) => {
  return <AnimatedLikeButton data={data} mutation={mutation} />
}
