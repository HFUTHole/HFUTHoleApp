import React from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { CarouselAction } from '@/pages/market/components/CarouselAction'
import { GoodsCampusList } from '@/pages/market/components/constant'

import { AppDenoIcon } from '@/components/svg/SvgIcons'
import { SvgXml } from 'react-native-svg'
import { useUsedGoodsRoute } from '@/shared/hooks/route/useUsedGoodsRoute'
import { Else, If, Then } from 'react-if'
import {
  CategoriesButton,
  MyGoodsCollectButton,
  MyGoodsPostedButton,
} from '@/pages/market/components/HeaderButtons'

export const GoodsHomeHeader: React.FC = () => {
  const { goArea, goFavorite, goMy } = useUsedGoodsRoute()

  const actions = [
    {
      name: '我发布的',
      component: MyGoodsPostedButton,
    },
    {
      name: '我的收藏',
      component: MyGoodsCollectButton,
    },
    {
      name: '所有分类',
      component: CategoriesButton,
    },
  ]

  return (
    <>
      <View className="flex-1 mt-4">
        <View className="flex-1 px-4 mb-4">
          <View className="bg-white rounded-md py-2">
            <View className={'flex-row'}>
              {actions.map((item) => (
                <View className="flex-1 items-center justify-center bg-white rounded-xl  py-2 space-y-1 w-full">
                  <View>
                    <item.component />
                  </View>
                  <Text className="text-xs">{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View className="flex-row justify-between items-center px-4 py-2 space-x-2 flex-1">
        {GoodsCampusList.map((item) => (
          <TouchableOpacity
            className="bg-white p-2 rounded-xl flex-1 shadow-sm"
            onPress={() => {
              goArea(item.name)
            }}
            key={item.id}
            activeOpacity={0.7}
          >
            <View className="flex-1 justify-center items-center">
              <Image
                source={{ uri: item.img }}
                className="w-[96px] h-[96px] rounded-xl"
              />
            </View>
            <View className="my-2">
              <Text className="text-center text-sm">{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  )
}
