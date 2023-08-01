import { useHoleReplyList } from '@/swr/hole/reply'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { View } from 'react-native'
import { LoadMore } from '@/components/LoadMore'
import { LoadingScreen } from '@/components/LoadingScreen'
import { CommentBottomInput } from '@/pages/hole/detail/components/CommentBottomInput'
import { HoleReplyListHeader } from '@/pages/hole/detail/reply/HoleReplyListHeader'
import { HoleReplyListItem } from '@/pages/hole/detail/reply/HoleReplyListItem'
import { CommentMaskModal } from '@/pages/hole/detail/components/CommentMaskModal'

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

  return (
    <LoadingScreen isLoading={isLoading}>
      <View className={'bg-white h-full'}>
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
          renderItem={(props) => <HoleReplyListItem {...props} />}
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
