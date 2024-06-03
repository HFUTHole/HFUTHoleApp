import { useMarketFavoriteGoodsList } from '@/swr/market/goods'
import { FlashList } from '@shopify/flash-list'
import { memo } from 'react'
import { View } from 'react-native'
import { RefreshableGoodsList } from './GoodsList'
import { GoodsItemCardHorizontal } from './components/GoodsCard'

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
  const query = useMarketFavoriteGoodsList()
  return (
    <View className='flex-1 py-1'>
      <RefreshableGoodsList
        FlatListComponent={MarketFavoriteGoodsFlashList}
		renderItem={({ item }) => <GoodsItemCardHorizontal item={item as any} />}
        {...query}
      />
    </View>
  )
}
