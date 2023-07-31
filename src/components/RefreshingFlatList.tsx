import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import type { FlatListProps } from 'react-native'
import { Func } from '@/shared/types'
import { useDebounceFn } from 'ahooks'
import { RefreshIndicatorControl } from '@/components/RefreshIndicatorControl'

type Props<T> = {
  onRefreshing?: Func
  onTopRefresh?: Func
  fetchNextPage?: Func
  hasNextPage?: boolean
} & FlatListProps<T>

function RefreshingFlatListInner<T = any>(
  props: Props<T>,
  ref: ForwardedRef<FlatList>
) {
  const [refreshing, setRefreshing] = useState(!!props.refreshing)

  useEffect(() => {
    setRefreshing(!!props.refreshing)
  }, [props.refreshing])

  const { run: onRefresh } = useDebounceFn(
    async () => {
      if (!props.hasNextPage) {
        return
      }

      // 兼容过去的 onRefreshing 获取下一页的写法
      const fetchNextPageFn = props.onRefreshing || props.fetchNextPage

      await fetchNextPageFn?.()
      setRefreshing(false)
    },
    { wait: 200 }
  )

  const onScroll = props.onScroll

  return (
    <FlatList
      ref={ref}
      onScroll={onScroll}
      refreshing={refreshing}
      onEndReachedThreshold={0.1}
      onEndReached={onRefresh}
      nestedScrollEnabled={true}
      refreshControl={
        props.onTopRefresh && (
          <RefreshIndicatorControl
            refreshing={refreshing}
            onRefresh={props.onTopRefresh}
          />
        )
      }
      {...props}
    />
  )
}

export const RefreshingFlatList = forwardRef(RefreshingFlatListInner) as <
  T = any
>(
  props: Props<T>,
  ref: ForwardedRef<FlatList>
) => React.JSX.Element
