import { useHoleReplyList } from '@/swr/hole/reply'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { View } from 'react-native'
import { LoadMore } from '@/components/LoadMore'
import { LoadingScreen } from '@/components/LoadingScreen'
import { CommentBottomInput } from '@/pages/hole/detail/components/CommentBottomInput'
import { HoleReplyListHeader } from '@/pages/hole/detail/reply/HoleReplyListHeader'
import { HoleReplyListItem } from '@/pages/hole/detail/reply/HoleReplyListItem'
import { CommentMaskModal } from '@/pages/hole/detail/components/CommentMaskModal'
import { useReplyExpressEmojiDisplay } from '@/shared/hooks/emoji/useExpressEmojiDisplay'
import { PopoverCard } from '@/components/PopoverCard/PopoverCard'
import { EmojiCard } from '@/components/emoji/EmojiCard/EmojiCard'

// TODO 重写回复区，尤其是展示特定的评论
export function HoleReply() {
  const {
    hasNextPage,
    onRefresh,
    onTopRefresh,
    isLoading,
    comment,
    flattenData: { data: flattenData, isEmpty: isDataEmpty },
    params,
  } = useHoleReplyList()
  const { popoverVisible, coordinateY, onEmojiPress, handleLongPress } =
    useReplyExpressEmojiDisplay()

  return (
    <LoadingScreen isLoading={isLoading}>
      <View className={'bg-white h-full'}>
        <PopoverCard isVisible={popoverVisible} coordinateY={coordinateY}>
          <EmojiCard onPress={onEmojiPress} />
        </PopoverCard>
        <RefreshingFlatList
          data={flattenData}
          refreshing={isLoading}
          hasNextPage={hasNextPage}
          ListHeaderComponent={HoleReplyListHeader}
          ListFooterComponent={() => (
            <LoadMore
              text={isDataEmpty ? '没有更多回复了哦' : ''}
              hasNextPage={hasNextPage!}
            />
          )}
          onRefreshing={onRefresh}
          onTopRefresh={onTopRefresh}
          renderItem={(props) => (
            <HoleReplyListItem
              {...props}
              onLongPress={(e) => handleLongPress(e, props.item.id)}
            />
          )}
        />
        <CommentBottomInput
          data={{
            commentId: comment?.id,
            user: comment?.user,
          }}
        />
        {params.isMessageFrom && <CommentMaskModal />}
      </View>
    </LoadingScreen>
  )
}
