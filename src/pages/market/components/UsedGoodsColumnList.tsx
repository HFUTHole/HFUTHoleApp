import React, { memo } from 'react'
import { GoodsHomeHeader } from '@/pages/market/components/GoodsHomeHeader'
import { FlashList, FlashListProps } from '@shopify/flash-list'
import {
  RefreshableGoodsList,
  RefreshableGoodsListProps,
} from '@/pages/market/GoodsList'
import { GoodsItemCard } from '@/pages/market/components/GoodsCard'
import { ScreenWidth } from '@/shared/utils/utils'

const UsedGoodsFlashList = memo((props: any) => (
  <FlashList {...props} numColumns={2} estimatedItemSize={ScreenWidth * 0.45} />
))

export const UsedGoodsColumnList: React.FC<
  RefreshableGoodsListProps & Partial<FlashListProps<any>>
> = (props) => {
  return (
    <RefreshableGoodsList
      {...props}
      FlatListComponent={UsedGoodsFlashList}
      renderItem={({ item, index }) => (
        <GoodsItemCard item={item as any} index={index} />
      )}
    />
  )
}
