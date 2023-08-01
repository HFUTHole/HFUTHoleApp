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
import { LoadMore } from '@/components/LoadMore'
import { hasNextPage } from 'react-query/types/core/infiniteQueryBehavior'

interface Props {
  data: MessageAbleItem[]
  hasNextPage: boolean | undefined
  fetchNextPage: Func
  onTopRefresh: Func
  emptyText: string
  loadText: string
  isError?: boolean
}

export function MessageList({
  data,
  onTopRefresh,
  fetchNextPage,
  hasNextPage,
  ...props
}: Props) {
  const { onMessagePress } = useNavigateToMessageTarget()
  return (
    <View className={'bg-white'}>
      <RefreshingFlatList
        data={data}
        fetchNextPage={fetchNextPage}
        onTopRefresh={onTopRefresh}
        hasNextPage={hasNextPage!}
        renderItem={({ item }) => (
          <MessageListItem data={item} onPress={() => onMessagePress(item)} />
        )}
        ListEmptyComponent={<Empty text={props.emptyText} />}
        ListFooterComponent={
          <LoadMore hasNextPage={hasNextPage!} text={props.loadText} />
        }
      />
    </View>
  )
}
