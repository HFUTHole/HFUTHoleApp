import { FlashList } from '@shopify/flash-list'
import React, { memo, useState } from 'react'
import { GoodsItemCard } from './components/GoodsCard'
import { RefreshableGoodsList } from './GoodsList'
import { useUsedGoodsList } from '@/swr/market/goods'
import { GoodsHomeHeader } from '@/pages/market/components/GoodsHomeHeader'
import { UsedGoodsColumnList } from '@/pages/market/components/UsedGoodsColumnList'

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
  const marketGoodsListQuery = useUsedGoodsList()

  return (
    <UsedGoodsColumnList
      {...marketGoodsListQuery}
      ListHeaderComponent={GoodsHomeHeader}
    />
  )
}
