import { useUserCommentsListQuery } from '@/swr/user/comment'
import { LoadingScreen } from '@/components/LoadingScreen'
import { MessageList } from '@/components/MessageList/MessageList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'

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
      <SafeAreaView className={'flex-1 bg-white'}>
        <BackHeader title={'我发布的评论'} />
        <MessageList
          data={data}
          fetchNextPage={fetchNextPage}
          onTopRefresh={invalidateQuery}
          hasNextPage={hasNextPage}
          emptyText={'没有更多的评论了哦'}
        />
      </SafeAreaView>
    </LoadingScreen>
  )
}
