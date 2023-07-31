import { useHoleComment, useHoleDetail } from '@/swr/hole'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { HoleInfo, HoleInfoBody } from '@/pages/hole/components/HoleInfo'
import { LikeHole } from '@/pages/hole/detail/LikeHole'
import { Separator } from '@/components/Separator'
import { HoleDetailCommentHeader } from '@/pages/hole/detail/components/CommentHeader'
import { LoadMore } from '@/components/LoadMore'
import { HoleDetailCommentItem } from '@/pages/hole/detail/components/CommentItem'
import { BilibiliPlayer } from '@/components/player/BilibiliPlayer'
import React from 'react'
import { View } from 'react-native'
import { useHoleDetailCommentContext } from '@/shared/context/hole_detail'
import { Empty } from '@/components/image/Empty'
import { PrimaryText } from '@/components/Text/PrimaryText'

const DetailBody = React.memo(() => {
  const { data } = useHoleDetail()

  return (
    <View className={'space-y-2'}>
      <View>
        <HoleInfoBody data={data!} />
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
      <HoleInfo
        data={data!}
        header={<></>}
        body={<DetailBody />}
        bottom={<LikeHole />}
        showComment={false}
      />
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
        overScrollMode={'never'}
      />
    </>
  )
}
