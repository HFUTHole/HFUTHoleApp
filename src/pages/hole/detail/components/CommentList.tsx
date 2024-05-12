import { useHoleComment, useHoleDetail } from '@/swr/hole'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import {
  HoleInfo,
  HoleInfoTitleWithBody,
} from '@/pages/hole/components/HoleInfo'
import { Separator } from '@/components/Separator'
import { HoleDetailCommentHeader } from '@/pages/hole/detail/components/CommentHeader'
import { LoadMore } from '@/components/LoadMore'
import { HoleDetailCommentItem } from '@/pages/hole/detail/components/CommentItem'
import { BilibiliPlayer } from '@/components/player/BilibiliPlayer'
import React, { useEffect, useRef } from 'react'
import { FlatList, View } from 'react-native'
import { useHoleDetailCommentContext } from '@/shared/context/hole_detail'
import { Empty } from '@/components/image/Empty'
import { TimeText } from '@/components/Text/Time'
import { If, Then } from 'react-if'
import { HoleDetailImageCarousel } from '@/pages/hole/detail/components/HoleDetailImageCarousel'
import { HoleDetailTags } from '@/pages/hole/detail/components/HoleDetailTags'
import clsx from 'clsx'
import { useCommentEventBusContext } from '@/shared/context/comment/eventBus'

const DetailBody = React.memo(() => {
  const { data } = useHoleDetail()
  const hasImages = (data?.imgs.length || 0) > 0
  const hasTags = (data?.tags.length || 0) > 0

  return (
    <View>
      <If condition={hasImages}>
        <Then>
          <HoleDetailImageCarousel data={data!} />
        </Then>
      </If>
      <View
        className={clsx([
          'px-[2.5vw]',
          {
            'py-4': !hasImages,
          },
        ])}
      >
        <HoleInfoTitleWithBody data={data!} />
        <If condition={hasTags}>
          <Then>
            <View className={'mt-2'}>
              <HoleDetailTags data={data!} />
            </View>
          </Then>
        </If>
        <View className={'py-4'}>
          <TimeText time={data!.createAt}></TimeText>
        </View>
      </View>
    </View>
  )
})

const HoleDetailCommentEmpty = () => {
  const { isAllMode } = useHoleDetailCommentContext()

  return (
    <View className={'py-2'}>
      <Empty
        text={isAllMode ? 'lz正在期待第一个评论' : 'lz还没填楼噢'}
        size={200}
      />
    </View>
  )
}

const HoleTopDetail = React.memo(() => {
  const { data } = useHoleDetail()

  return (
    <View>
      <DetailBody />
      <Separator />
      <HoleDetailCommentHeader />
    </View>
  )
})

export function HoleDetailCommentList() {
  const {
    flattenData,
    fetchNextPage,
    hasNextPage,
    invalidateQuery,
    isDataEmpty,
    isFetching,
  } = useHoleComment()

  const { data } = useHoleDetail()

  const { scrollEvent } = useCommentEventBusContext()

  const flatListRef = useRef<FlatList | null>(null)

  scrollEvent.useSubscription((index) => {
    flatListRef.current?.scrollToIndex({
      index,
    })
  })

  const onRefresh = async () => {
    await fetchNextPage()
  }

  const onTopRefresh = async () => {
    await Promise.all([await invalidateQuery()])
  }

  return (
    <>
      {data?.bilibili && (
        <View className={'px-2'}>
          <BilibiliPlayer bvid={data!.bilibili!} />
        </View>
      )}

      <RefreshingFlatList
        ref={flatListRef}
        onRefreshing={onRefresh}
        hasNextPage={hasNextPage}
        onTopRefresh={onTopRefresh}
        refreshing={isFetching}
        ListHeaderComponent={HoleTopDetail}
        ListFooterComponent={() => (
          <LoadMore
            text={isDataEmpty ? '没有更多评论了哦' : ''}
            hasNextPage={hasNextPage!}
          />
        )}
        data={flattenData}
        ListEmptyComponent={HoleDetailCommentEmpty}
        renderItem={({ item, index }) => (
          <HoleDetailCommentItem data={item} page={index} key={item.id} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        overScrollMode={'never'}
      />
    </>
  )
}
