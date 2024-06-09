import React, { MutableRefObject, useRef } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { Portal, Text, TouchableRipple } from 'react-native-paper'
import { SvgXml } from 'react-native-svg'
import BottomSheet from '@gorhom/bottom-sheet'
import { FlashList } from '@shopify/flash-list'
import { goodsCategories } from '@/pages/market/components/constant'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { DefaultBottomSheetBackdrop } from '@/components/sheet/DefaultBottomSheetBackdrop'
import { NativeTextInput } from '@/components/form/NativeInput'

const GoodsCategoriesCard = ({
  item,
}: {
  item: {
    id: number
    name: string
    icon: string
  }
}) => {
  return (
    <View className="bg-white items-center justify-center w-full px-1 my-1 rounded-xl overflow-hidden">
      <TouchableRipple onPress={() => {}} className="h-[72px] w-full">
        <View className="h-full w-full items-center justify-center space-y-1">
          <Image
            source={{ uri: item.icon }}
            className="w-5 h-5"
            resizeMode="contain"
          />
          <Text className="text-center text-sm">{item.name}</Text>
        </View>
      </TouchableRipple>
    </View>
  )
}

const GoodsCategoriesList = () => {
  return (
    <View className="px-3 flex-1">
      <FlashList
        data={goodsCategories}
        numColumns={4}
        estimatedItemSize={96}
        renderItem={({ item }) => (
          <GoodsCategoriesCard key={item.id} item={item} />
        )}
      />
    </View>
  )
}

const CategoriesButton: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>()

  const categoryIcon = `
  	<svg width="24" height="24"  fill="#8C8C8C" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8C8C8C" class="size-6">
  		<path stroke-linecap="round" stroke-linejoin="round" 
			d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
	</svg>`

  return (
    <>
      <TouchableOpacity
        className="flex-row items-center justify-center bg-[#FFFFFF] rounded-xl w-[48px] h-[48px]"
        onPress={() => {
          bottomSheetRef.current!.expand()
        }}
      >
        <SvgXml xml={categoryIcon} className="w-[24px] h-[24px]" />
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
            <GoodsCategoriesList />
          </View>
        </BottomSheet>
      </Portal>
    </>
  )
}

export const GoodsHomeHeaderSearch: React.FC = () => {
  const {
    control,
    formState: { dirtyFields },
  } = useForm<{
    keywords: string
  }>({})

  return (
    <View className="flex-row justify-between items-center px-4 py-4 space-x-3">
      <View className="flex-1">
        <NativeTextInput
          style={{
            backgroundColor: '#b7b7b7',
            borderRadius: 9999,
          }}
          placeholder={'搜索商品'}
          name={'keywords'}
          control={control}
        />
      </View>
      <View>
        <CategoriesButton />
      </View>
    </View>
  )
}
