import {
  RefreshingFlatList,
  RefreshingFlatListInner,
} from '@/components/RefreshingFlatList'
import { useInteractiveNotificationsQuery } from '@/swr/notify/useInteractiveNotifications'
import { useMemo } from 'react'
import { flatInfiniteQueryData } from '@/swr/utils'
import { InteractiveNotifyItem } from '@/pages/notify/interaction/components/InteractiveNotifyItem'
import { LoadMore } from '@/components/LoadMore'
import { MessageList } from '@/components/MessageList/MessageList'

export function RefreshingInteractiveNotifications() {
  const { data, hasNextPage, fetchNextPage, invalidateQuery } =
    useInteractiveNotificationsQuery()

  const { data: listData } = useMemo(
    () => flatInfiniteQueryData<INotifyInteractionListItem>(data!),
    [data]
  )

  return (
    <MessageList
      data={listData}
      hasNextPage={hasNextPage!}
      onTopRefresh={invalidateQuery}
      fetchNextPage={fetchNextPage}
      emptyText={'没有更多通知了哦'}
    />
  )
}
