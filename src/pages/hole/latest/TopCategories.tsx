import { View } from 'react-native'
import { Categories } from '@/shared/constants/category'
import { Svg } from '@/components/svg/Svg'
import { Text, TouchableRipple } from 'react-native-paper'
import { useHoleCategoryRoute } from '@/shared/hooks/route/useHoleCategoryRoute'
import { Image } from 'expo-image'
import React from 'react'
import { useTagPostList } from '@/swr/hole/tag'
import { useHoleRoute } from '@/shared/hooks/route/useHoleRoute'

export function TopCategories() {
  const { goTag } = useHoleRoute()

  return (
    <>
      <View className={'rounded-lg bg-white flex-row flex-wrap py-2'}>
        {Categories.slice(0, 10).map((item) => (
          <TouchableRipple
            key={item.name}
            className={'p-2 w-1/5'}
            onPress={() =>
              goTag({
                tag: item.name,
              })
            }
          >
            <View className={'space-y-2 justify-center items-center'}>
              <Svg SvgComponent={item.icon} size={40} />
              <Text className={'text-black/80 text-xs'}>{item.name}</Text>
            </View>
          </TouchableRipple>
        ))}
      </View>
    </>
  )
}
