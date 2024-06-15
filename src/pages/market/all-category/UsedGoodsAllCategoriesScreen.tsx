import React from 'react'
import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { FlashList } from '@shopify/flash-list'
import { AntdIcon, FontV6Icon, IoniconsIcons } from '@/components/icon'
import { Icons } from '@/components/svg/SvgIcons'
import { useUsedGoodsRoute } from '@/shared/hooks/route/useUsedGoodsRoute'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'
import { useNavigation } from '@react-navigation/native'

const goodsCategories = [
  {
    name: '图书/教科书',
    icon: AntdIcon.appstore,
  },
  {
    name: '数码',
    icon: AntdIcon.camera,
  },
  {
    name: '美妆个护',
    icon: Icons.CosmeticIcon,
  },
  {
    name: '手机平板',
    icon: AntdIcon.mobile,
  },
  {
    name: '电脑设备',
    icon: AntdIcon.laptop,
  },
  {
    name: '代步工具',
    icon: AntdIcon.car,
  },
  {
    name: '服饰鞋帽',
    icon: Icons.ClothingIcon,
  },
  {
    name: '小零食',
    icon: IoniconsIcons.food,
  },
  {
    name: '运动健身',
    icon: FontV6Icon.dumbbell,
  },
  {
    name: '寝室用品',
    icon: FontV6Icon.bed,
  },
  {
    name: '其它',
    icon: AntdIcon.appstore,
  },
]

export const UsedGoodsAllCategoriesScreen: React.FC = () => {
  const { goCategory } = useUsedGoodsRoute()
  const navigation = useNavigation()

  return (
    <SafeAreaView className={'flex-1 bg-white'}>
      <BackHeader title={'所有分类'} />
      <View className="bg-white rounded-t-3xl flex-1">
        <View className="px-3 flex-1">
          <FlashList
            data={goodsCategories}
            numColumns={4}
            estimatedItemSize={96}
            renderItem={({ item }) => (
              <View className="bg-white items-center justify-center w-full px-1 my-1 rounded-xl overflow-hidden">
                <TouchableRipple
                  onPress={() => {
                    navigation.goBack()
                    goCategory(item.name)
                  }}
                  className="h-[72px] w-full"
                >
                  <View className="h-full w-full items-center justify-center space-y-2">
                    <View>
                      <item.icon size={24} color={'#DF4C1C'} />
                    </View>
                    <Text className="text-center text-xs">{item.name}</Text>
                  </View>
                </TouchableRipple>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
