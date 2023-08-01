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
import { useStatusBarStyle } from '@/shared/hooks/useStatusBarStyle'

// TODO 完善类型
type Props = UseInfiniteQueryResult<IHoleListResponse, unknown> & {
  invalidateQuery: Func
  ListHeaderComponent?: FlatListProps<any>['ListHeaderComponent']
  onScroll?: Func
}

function RefreshableHoleListInner(
  {
    isSuccess,
    data,
    hasNextPage,
    fetchNextPage,
    invalidateQuery,
    ListHeaderComponent,
    onScroll,
  }: Props,
  ref
) {
  const { go } = useHoleDetailRoute()
  const theme = useTheme()

  const { data: flatListData, isEmpty: isHoleListEmpty } =
    flatInfiniteQueryData(data)

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} />
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
                  text={'没有更多帖子了哦'}
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
