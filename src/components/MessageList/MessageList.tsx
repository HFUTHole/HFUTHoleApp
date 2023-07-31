import { useUserCommentsListQuery } from '@/swr/user/comment'
import { LoadingScreen } from '@/components/LoadingScreen'
import { View } from 'react-native'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { MessageListItem } from '@/components/MessageList/MessageListItem'
import { Empty } from '@/components/image/Empty'
import { Func } from '@/shared/types'
import {
  MessageAbleItem,
  useNavigateToMessageTarget,
} from '@/shared/hooks/useNavigateToMessageTarget'

interface Props {
  data: MessageAbleItem[]
  hasNextPage: boolean | undefined
  fetchNextPage: Func
  onTopRefresh: Func
  emptyText: string
  isError?: boolean
}

export function MessageList({ data, onTopRefresh, fetchNextPage }: Props) {
  const { onMessagePress } = useNavigateToMessageTarget()
  return (
    <View className={'bg-white min-h-screen'}>
      <RefreshingFlatList
        data={data}
        fetchNextPage={fetchNextPage}
        onTopRefresh={onTopRefresh}
        renderItem={({ item }) => (
          <MessageListItem data={item} onPress={() => onMessagePress(item)} />
        )}
        ListEmptyComponent={<Empty text={'没有更多评论了哦'} />}
      />
    </View>
  )
}
