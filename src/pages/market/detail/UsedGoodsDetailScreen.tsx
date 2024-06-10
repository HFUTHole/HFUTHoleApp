import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { BackHeaderBackButton } from '@/components/Header'
import { MoreHorizontalIcon } from '@/components/icon'
import { IconButton } from '@/components/IconButton'
import { useUsedGoodsDetail } from '@/swr/market/goods'
import { LoadingScreen } from '@/components/LoadingScreen'
import { UsedGoodsDetailBottomAction } from '@/pages/market/detail/BottomAction'
import { UsedGoodsDetailCommentArea } from '@/pages/market/detail/CommentArea'
import { CommentEventBusProvider } from '@/shared/context/comment/eventBus'
import { BottomCommentContext } from '@/shared/context/hole/comment'

export const UsedGoodsHeader: React.FC<{ data?: IUsedGoodsDetailResponse }> = (
  props,
) => {
  const { data } = props

  console.log(data)
  return (
    <View className={'w-full bg-white justify-between flex-row items-center'}>
      <View className={'flex-row space-x-2 items-center'}>
        <BackHeaderBackButton />
      </View>
      <IconButton
        onPress={() => {}}
        icon={() => <MoreHorizontalIcon size={25} color={'#000'} />}
      />
    </View>
  )
}

export const UsedGoodsDetailScreen: React.FC = () => {
  const { data, isLoading } = useUsedGoodsDetail()

  return (
    <CommentEventBusProvider>
      <BottomCommentContext isGoods={true}>
        <CommentEventBusProvider>
          <SafeAreaView className={'flex-1 bg-white'}>
            <UsedGoodsHeader data={data} />
            <LoadingScreen isLoading={isLoading}>
              <UsedGoodsDetailCommentArea />
              <UsedGoodsDetailBottomAction data={data!} />
            </LoadingScreen>
          </SafeAreaView>
        </CommentEventBusProvider>
      </BottomCommentContext>
    </CommentEventBusProvider>
  )
}
