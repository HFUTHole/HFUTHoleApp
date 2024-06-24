import { useMarketFavoriteGoodsList } from '@/swr/market/goods'
import { FlashList } from '@shopify/flash-list'
import React, { memo } from 'react'
import { View } from 'react-native'
import { RefreshableGoodsList } from './GoodsList'
import { GoodsItemCardHorizontal } from './components/GoodsCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader, Header } from '@/components/Header'
import { useUsedGoodsCollectListQuery } from '@/swr/market/collect'
import { InferArrayItem } from '@/shared/types'

const MarketFavoriteGoodsFlashList = memo((props: any) => (
  <FlashList
    {...props}
    ListHeaderComponentStyle={{ flex: 1 }}
    numColumns={1}
    estimatedItemSize={261}
    style={[]}
  />
))

export const MarketFavoriteScreen: React.FunctionComponent = () => {
  const query = useUsedGoodsCollectListQuery()
  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeader title={'我的收藏'} />
      <View className={'py-2 bg-[#efefef] flex-1'}>
        <RefreshableGoodsList
          showFab={false}
          FlatListComponent={MarketFavoriteGoodsFlashList}
          renderItem={({ item }) => (
            <GoodsItemCardHorizontal
              data={
                item as unknown as InferArrayItem<
                  IUsedGoodsCollectedListResponse['items']
                >
              }
            />
          )}
          {...query}
        />
      </View>
    </SafeAreaView>
  )
}
