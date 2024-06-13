import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'
import { useUsedGoodsUserPostedList } from '@/swr/market/user'
import { LoadingScreen } from '@/components/LoadingScreen'
import { RefreshableGoodsList } from '@/pages/market/GoodsList'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { InferArrayItem } from '@/shared/types'
import { Image } from 'expo-image'
import { PriceText } from '@/pages/market/components/PriceText'
import { MyGoodsOfflineGoods } from '@/pages/market/my-goods/MyGoodsButton'
import { useUsedGoodsRoute } from '@/shared/hooks/route/useUsedGoodsRoute'

export type UsedGoodsUserGoodsListItem = InferArrayItem<
  IUsedGoodsUserGoodsListResponse['items']
>

const Item: React.FC<{ data: UsedGoodsUserGoodsListItem }> = (props) => {
  const { data } = props

  const { goDetail } = useUsedGoodsRoute()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={'my-2'}
      onPress={() => {
        goDetail(data.id)
      }}
    >
      <View className={'bg-white rounded-lg p-3'}>
        <View className={'flex-row space-x-2 items-center'}>
          <Image
            source={{ uri: data?.imgs?.[0] }}
            className={'w-24 h-24 rounded-lg'}
          />
          <View className={'flex-1 justify-between h-24'}>
            <Text className={'text-black font-bold'} numberOfLines={2}>
              {data.body}
            </Text>
            <PriceText className={'font-bold'}>
              {data.price.toFixed(2)}
            </PriceText>
            <View className={'w-full flex-row justify-between items-center'}>
              <Text className={'text-xs text-tertiary-label'}>浏览0</Text>

              <View className={'flex-row space-x-2'}>
                <MyGoodsOfflineGoods data={data} />
                <Pressable
                  className={
                    'px-3 py-1 rounded-full border-[1px] border-black/10'
                  }
                >
                  <Text>编辑</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const UsedGoodsUserGoodsListScreen: React.FC = () => {
  const query = useUsedGoodsUserPostedList()

  return (
    <SafeAreaView className={'bg-white flex-1'}>
      <BackHeader title={'我发布的'} />
      <LoadingScreen isLoading={query.isLoading}>
        <View className={'flex-1 bg-[#efefef] px-[2.5vw]'}>
          <RefreshableGoodsList
            {...query}
            renderItem={({ item }) => {
              return <Item data={item as unknown as Item} />
            }}
          />
        </View>
      </LoadingScreen>
    </SafeAreaView>
  )
}
