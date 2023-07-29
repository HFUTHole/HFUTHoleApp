import { View } from 'react-native'
import { CommentItem } from '@/pages/hole/components/CommentItem'
import {
  DeleteCommentLikeRequest,
  LikeCommentRequest,
} from '@/request/apis/hole'
import { Separator } from '@/components/Separator'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { useHoleReplyList } from '@/swr/hole/reply'

export function HoleReplyListHeader() {
  const {
    data,
    setData,
    comment,
    flattenData: { data: flattenData, isEmpty: isDataEmpty },
  } = useHoleReplyList()

  const onLikePress = () => {
    setData((oldData) => {
      const comment = oldData!.pages[0].comment!

      comment.isLiked = !comment.isLiked

      if (comment.isLiked) {
        comment.favoriteCounts++
      } else {
        comment.favoriteCounts = Math.max(comment.favoriteCounts - 1, 0)
      }

      return oldData!
    })
  }

  return (
    <>
      <View className={'px-3'}>
        <CommentItem
          data={comment!}
          reqFunc={
            comment?.isLiked ? DeleteCommentLikeRequest : LikeCommentRequest
          }
          onLikePress={onLikePress}
          isReply={true}
        />
      </View>
      <Separator />
      <View className={'p-3'}>
        <SecondaryText>
          共有{data?.pages?.[0]?.meta.totalItems}条回复
        </SecondaryText>
      </View>
    </>
  )
}
