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
// import { AnimatedHolePostFAB } from '@/pages/hole/PostFab'
// import { AnimatedToTopFAB } from '@/pages/hole/ToTopFab'
import { useBoolean } from 'ahooks'
import { GoodsItem, GoodsItemCard } from './components/GoodsCard'
import { AnimatedHolePostFAB } from '@/pages/hole/PostFab'
import { AnimatedToTopFAB } from '@/pages/hole/ToTopFab'

interface IGoodsListResponse {
  items: GoodsItem[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}

// TODO 完善类型
export type RefreshableGoodsListProps<
  T extends IGoodsListResponse = IGoodsListResponse,
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

const Item = memo(({ item, index }: { item: GoodsItem; index: number }) => {
  //   const { go } = useGoodsDetailRoute()

  return <GoodsItemCard item={item} index={index} />
})

function InnerRefreshableGoodsList<
  T extends IGoodsListResponse = IGoodsListResponse,
>({
  isSuccess,
  data,
  hasNextPage,
  fetchNextPage,
  invalidateQuery,
  ListHeaderComponent,
  ...props
}: RefreshableGoodsListProps<T>) {
  const { data: flatListData, isEmpty: isGoodsListEmpty } =
    flatInfiniteQueryData(data)

  const listRef = useRef<FlatList>(null)

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
    console.log(listRef)
    // listRef.current!.scrollToOffset({ offset: 0, animated: true })
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
            isGoodsListEmpty ? (
              <></>
            ) : (
              <View>
                <LoadMore
                  text={'没有更多商品了哦'}
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

export const RefreshableGoodsList = forwardRef(InnerRefreshableGoodsList)
