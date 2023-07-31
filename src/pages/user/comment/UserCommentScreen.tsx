import { useUserCommentsListQuery } from '@/swr/user/comment'
import { LoadingScreen } from '@/components/LoadingScreen'
import { MessageList } from '@/components/MessageList/MessageList'

export function UserCommentScreen() {
  const {
    isLoading,
    flattenData: { data },
    fetchNextPage,
    invalidateQuery,
    hasNextPage,
  } = useUserCommentsListQuery()

  return (
    <LoadingScreen isLoading={isLoading}>
      <MessageList
        data={data}
        fetchNextPage={fetchNextPage}
        onTopRefresh={invalidateQuery}
        hasNextPage={hasNextPage}
        emptyText={'没有更多的评论了哦'}
      />
    </LoadingScreen>
  )
}
