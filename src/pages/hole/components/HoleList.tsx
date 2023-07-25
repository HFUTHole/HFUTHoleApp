import { LoadMore } from '@/components/LoadMore'
import { FlatListProps, StatusBar, Text, View } from 'react-native'
import { HoleInfo } from '@/pages/hole/components/HoleInfo'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { UseInfiniteQueryResult } from 'react-query'
import { SkeletonLoading } from '@/components/Skeleton'
import { Func } from '@/shared/types'
import { useHoleDetailRoute } from '@/shared/hooks/route/useHoleDetailRoute'
import { useMemo, useState } from 'react'
import { Empty } from '@/components/image/Empty'
import { flatInfiniteQueryData } from '@/swr/utils'
import { useTheme } from 'react-native-paper'
import { forwardRef } from 'react'

// TODO 完善类型
type Props = UseInfiniteQueryResult<IHoleListResponse, unknown> & {
  invalidateQuery: Func
  ListHeaderComponent?: FlatListProps<any>['ListHeaderComponent']
}

function RefreshableHoleListInner(
  {
    isSuccess,
    data,
    hasNextPage,
    fetchNextPage,
    invalidateQuery,
    ListHeaderComponent,
  }: Props,
  ref
) {
  const [scrollY, setScrollY] = useState(0)

  const onScroll = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y)
  }

  const { go } = useHoleDetailRoute()

  const { data: flatListData, isEmpty: isHoleListEmpty } =
    flatInfiniteQueryData(data)

  return (
    <>
      {isSuccess ? (
        <RefreshingFlatList
          ref={ref}
          onScroll={onScroll}
          data={flatListData}
          hasNextPage={hasNextPage}
          onRefreshing={fetchNextPage}
          onTopRefresh={invalidateQuery}
          ListEmptyComponent={() => <Empty />}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={() =>
            isHoleListEmpty ? (
              <></>
            ) : (
              <View>
                <LoadMore
                  text={'没有更多树洞了哦'}
                  hasNextPage={hasNextPage!}
                />
              </View>
            )
          }
          renderItem={({ item }) => (
            <HoleInfo key={item.id} data={item} onPress={() => go(item.id)} />
          )}
        />
      ) : (
        <SkeletonLoading nums={3} />
      )}
    </>
  )
}

export const RefreshableHoleList = forwardRef(RefreshableHoleListInner)
