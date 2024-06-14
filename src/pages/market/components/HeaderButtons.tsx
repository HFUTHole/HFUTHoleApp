import React, { MutableRefObject, useRef } from 'react'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Image, Pressable, TouchableOpacity, View } from 'react-native'
import { AntdIcon, FontV6Icon, IoniconsIcons } from '@/components/icon'
import { Portal, Text, TouchableRipple } from 'react-native-paper'
import BottomSheet from '@gorhom/bottom-sheet'
import { DefaultBottomSheetBackdrop } from '@/components/sheet/DefaultBottomSheetBackdrop'
import { FlashList } from '@shopify/flash-list'
import { useUsedGoodsRoute } from '@/shared/hooks/route/useUsedGoodsRoute'
import { Icons } from '@/components/svg/SvgIcons'
import { Func } from '@/shared/types'

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

export const CategoriesButton: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>()
  const { goCategory } = useUsedGoodsRoute()

  return (
    <>
      <TouchableOpacity
        className="flex-row items-center justify-center"
        onPress={() => {
          bottomSheetRef.current!.expand()
        }}
        activeOpacity={0.8}
      >
        <AntdIcon.appstore color={'#DF4C1C'} size={24} />
      </TouchableOpacity>
      <Portal>
        <BottomSheet
          index={-1}
          ref={bottomSheetRef as MutableRefObject<BottomSheetMethods>}
          snapPoints={['70%']}
          enablePanDownToClose={true}
          backdropComponent={DefaultBottomSheetBackdrop}
        >
          <View className="bg-white rounded-t-3xl flex-1">
            <View className="flex-row justify-center items-center h-12 bg-white rounded-t-3xl">
              <Text className="text-lg font-bold">所有类别</Text>
            </View>
            <View className="px-3 flex-1">
              <FlashList
                data={goodsCategories}
                numColumns={4}
                estimatedItemSize={96}
                renderItem={({ item }) => (
                  <View className="bg-white items-center justify-center w-full px-1 my-1 rounded-xl overflow-hidden">
                    <TouchableRipple
                      onPress={() => {
                        goCategory(item.name)
                        bottomSheetRef.current?.close()
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
        </BottomSheet>
      </Portal>
    </>
  )
}

export const MyGoodsCollectButton = () => {
  const { goFavorite } = useUsedGoodsRoute()

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={goFavorite}>
      <AntdIcon.shopping color={'#DF4C1C'} size={24} />
    </TouchableOpacity>
  )
}

export const MyGoodsPostedButton = () => {
  const { goMy } = useUsedGoodsRoute()
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={goMy}>
      <AntdIcon.isv color={'#DF4C1C'} size={24} />
    </TouchableOpacity>
  )
}
