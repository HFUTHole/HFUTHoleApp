import { ListRenderItem, View } from 'react-native'
import { CommentItem } from '@/pages/hole/components/CommentItem'
import { DeleteReplyLikeRequest, LikeReplyRequest } from '@/request/apis/hole'
import { useBottomCommentContext } from '@/shared/context/hole/comment'
import { useHoleReplyList } from '@/swr/hole/reply'

export const HoleReplyListItem: ListRenderItem<IHoleReplyListItem> = ({
  item,
  index,
}) => {
  const { setIsLiked, comment } = useHoleReplyList()

  const { openInput } = useBottomCommentContext()

  return (
    <View className={`px-3 ${item.isNotification && 'bg-surface/20'}`}>
      <CommentItem
        data={item}
        key={item.id}
        selectable={true}
        reqFunc={item.isLiked ? DeleteReplyLikeRequest : LikeReplyRequest}
        onLikePress={() => setIsLiked(item, index)}
        onBodyPress={(data) => {
          openInput({
            commentId: comment?.id,
            replyId: data.id,
            body: data.body,
            user: data.user,
          })
        }}
      />
    </View>
  )
}
