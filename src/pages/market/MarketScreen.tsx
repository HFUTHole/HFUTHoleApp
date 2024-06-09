import { FlashList } from '@shopify/flash-list'
import React, { memo, useState } from 'react'
import { GoodsItemCard } from './components/GoodsCard'
import { RefreshableGoodsList } from './GoodsList'
import { useMarketGoodsList } from '@/swr/market/goods'
import { GoodsHomeHeader } from '@/pages/market/components/GoodsHomeHeader'

const MarketGoodsFlashList = memo((props: any) => (
  <FlashList
    {...props}
    ListHeaderComponent={GoodsHomeHeader}
    ListHeaderComponentStyle={{ flex: 1 }}
    numColumns={2}
    estimatedItemSize={202}
  />
))

export const MarketScreen: React.FC = () => {
  const marketGoodsListQuery = useMarketGoodsList()

  return (
    <RefreshableGoodsList
      FlatListComponent={MarketGoodsFlashList}
      renderItem={({ item, index }) => (
        <GoodsItemCard item={item as any} index={index} />
      )}
      {...marketGoodsListQuery}
    />
  )
}
