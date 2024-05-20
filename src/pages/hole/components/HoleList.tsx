import { LoadMore } from '@/components/LoadMore'
import { FlatList, type FlatListProps, View } from 'react-native'
import { HoleInfo } from '@/pages/hole/components/HoleInfo'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { UseInfiniteQueryResult } from 'react-query'
import { SkeletonLoading } from '@/components/Skeleton'
import { Func } from '@/shared/types'
import { useHoleDetailRoute } from '@/shared/hooks/route/useHoleDetailRoute'
import { Empty } from '@/components/image/Empty'
import { flatInfiniteQueryData } from '@/swr/utils'
import React, {
  forwardRef,
  memo,
  type MutableRefObject,
  useRef,
  useState,
} from 'react'
import { AnimatedHolePostFAB } from '@/pages/hole/PostFab'
import { AnimatedToTopFAB } from '@/pages/hole/ToTopFab'
import { useBoolean } from 'ahooks'

// TODO 完善类型
export type RefreshableHoleListProps<
  T extends IHoleListResponse = IHoleListResponse,
> = UseInfiniteQueryResult<T, any> & {
  invalidateQuery: Func
  FlatListComponent?: any
} & PickedFlatListProps<T>

type PickedFlatListProps<T> = Partial<
  Pick<
    FlatListProps<T>,
    | 'scrollEventThrottle'
    | 'onScroll'
    | 'ListHeaderComponent'
    | 'showsHorizontalScrollIndicator'
    | 'showsVerticalScrollIndicator'
    | 'renderItem'
    | 'contentContainerStyle'
    | 'style'
    | 'columnWrapperStyle'
  >
>

const Item = memo(({ item }: { item: IHole }) => {
  const { go } = useHoleDetailRoute()

  return (
    <HoleInfo
      key={item!.id}
      data={item!}
      onPress={() => {
        go(item!.id)
      }}
    />
  )
})

function InnerRefreshableHoleList<
  T extends IHoleListResponse = IHoleListResponse,
>({
  isSuccess,
  data,
  hasNextPage,
  fetchNextPage,
  invalidateQuery,
  ListHeaderComponent,
  ...props
}: RefreshableHoleListProps<T>) {
  const { data: flatListData, isEmpty: isHoleListEmpty } =
    flatInfiniteQueryData(data)

  const listRef = useRef<FlatList>()

  const CONTENT_OFFSET_THRESHOLD = 500
  const [PostFABOffset, setPostFABOffset] = useState(0)
  const [isToTopFABVisible, setToTopFABVisible] = useState(false)
  const [isScroll, isScrollActions] = useBoolean(false)

  const scrollHandler = (event: {
    nativeEvent: { contentOffset: { y: number } }
  }) => {
    if (event.nativeEvent.contentOffset.y > CONTENT_OFFSET_THRESHOLD) {
      setPostFABOffset(-70)
      setToTopFABVisible(true)
    } else {
      setToTopFABVisible(false)
      setPostFABOffset(0)
    }
  }

  const scrollToTopHandler = () => {
    listRef.current!.scrollToOffset({ offset: 0, animated: true })
  }

  return (
    <>
      <View className={'absolute z-[100] bottom-20 right-2'}>
        <AnimatedHolePostFAB offset={PostFABOffset} />
        <AnimatedToTopFAB
          visible={isToTopFABVisible}
          goToTop={scrollToTopHandler}
        />
      </View>
      {isSuccess ? (
        <RefreshingFlatList
          ref={listRef as MutableRefObject<FlatList>}
          onScroll={(event) => {
            scrollHandler(event)
            props.onScroll?.(event)
            isScrollActions.setTrue()
          }}
          onScrollEndDrag={isScrollActions.setFalse}
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
          renderItem={({ item }) => <Item key={item.id} item={item} />}
          {...props}
        />
      ) : (
        <SkeletonLoading nums={3} />
      )}
    </>
  )
}

export const RefreshableHoleList = forwardRef(InnerRefreshableHoleList)
