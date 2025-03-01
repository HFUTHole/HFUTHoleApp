import React, { useEffect, useRef, useState } from 'react'
import { FlatListProps, Text, View } from 'react-native'
import { useGoodsCommentsQuery } from '@/swr/market/comment'
import { LoadMore } from '@/components/LoadMore'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { CommentItem } from '@/pages/hole/components/CommentItem'
import { Apis } from '@/request/apis'
import { ReplyList } from '@/pages/hole/detail/components/ReplyList'
import { UsedGoodsDetailBody } from '@/pages/market/detail/Body'
import {
  useUsedGoodsDetail,
  useUsedGoodsDetailParams,
} from '@/swr/market/goods'
import { TimeText } from '@/components/Text/Time'
import { UsedGoodsDetailCommentInput } from '@/pages/market/detail/CommentInput'
import { useBottomCommentContext } from '@/shared/context/hole/comment'
import { FlashList } from '@shopify/flash-list'

type UsedGoodsDetailCommentAreaProps<T = any> = {
  ListHeaderComponent?: FlatListProps<T>['ListHeaderComponent']
}

export const UsedGoodsDetailCommentArea: React.FC<
  UsedGoodsDetailCommentAreaProps
> = (props) => {
  const params = useUsedGoodsDetailParams()
  const { data } = useUsedGoodsDetail()
  const { flattenData, ...query } = useGoodsCommentsQuery()

  const [height, setHeight] = useState(0)

  const commentListRef = useRef<FlashList<any>>()
  const { openInput } = useBottomCommentContext()

  useEffect(() => {
    if (params.commentId) {
      commentListRef.current!.scrollToOffset({ offset: height })
    }
  }, [params.commentId, height])

  return (
    <View className={'flex-1 bg-white mt-4'}>
      <UsedGoodsDetailCommentInput />
      <RefreshingFlatList
        ref={commentListRef}
        ListHeaderComponent={
          <View
            onLayout={(e) => {
              setHeight(e.nativeEvent.layout.height)
            }}
          >
            <UsedGoodsDetailBody />
            <Text className={'px-[2.5vw] mt-4 text-tertiary-label text-xs'}>
              <TimeText time={data?.createAt!} />
            </Text>
            <View className={'mt-4 h-[1px] w-full bg-[#ebebeb]'} />
            <Text className={'px-[2.5vw] mt-4 text-tertiary-label text-xs'}>
              共{data?.commentsCount}条评论
            </Text>
          </View>
        }
        onRefreshing={query.fetchNextPage}
        hasNextPage={query.hasNextPage}
        onTopRefresh={query.invalidateQuery}
        refreshing={query.isFetching}
        ListFooterComponent={() => (
          <LoadMore
            text={query.isDataEmpty ? '没有更多评论了哦' : ''}
            hasNextPage={query.hasNextPage!}
          />
        )}
        data={flattenData}
        renderItem={({ item, index }) => (
          <CommentItem
            data={item}
            deleteLikeRequest={Apis.hole.DeleteCommentLikeRequest}
            onLikeRequest={Apis.hole.LikeCommentRequest}
            onBodyPress={(data) => {
              openInput({
                commentId: item?.id,
                body: data.body,
                user: data.user,
              })
            }}
            bottom={<ReplyList data={item} />}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        overScrollMode={'never'}
      />
    </View>
  )
}
