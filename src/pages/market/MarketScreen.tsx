import { View, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, TextInput } from 'react-native-paper'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Controller, useForm } from 'react-hook-form'
import { SvgXml } from 'react-native-svg'
import { FlashList } from '@shopify/flash-list'
import clsx from 'clsx'
import { UserAvatar } from '@/components/UserAvatar'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { memo, useState } from 'react'
import { RefreshableHoleList } from '../hole/components/HoleList'
import { GoodsItemCard } from './components/GoodsCard'
import { RefreshableGoodsList } from './GoodsList'
import { useMarketGoodsList } from '@/swr/market/goods'

const goodsCategories = [
  {
    id: 1,
    name: '数码',
    icon: 'https://img.alicdn.com/imgextra/i2/O1CN01xmEMQy1azFI9B4d2M_!!6000000003400-2-tps-32-26.png',
  },
  {
    id: 2,
    name: '服饰鞋帽',
    icon: 'https://img.alicdn.com/imgextra/i3/O1CN01JE8GW928jquyI5lcx_!!6000000007969-2-tps-32-32.png',
  },
  {
    id: 3,
    name: '家具',
    icon: 'https://img.alicdn.com/imgextra/i1/O1CN01fv5l8a1Vu8nWkcryv_!!6000000002712-2-tps-34-30.png',
  },
  {
    id: 4,
    name: '家电',
    icon: 'https://img.alicdn.com/imgextra/i2/O1CN01kYIKhS29pdXDMQf2T_!!6000000008117-2-tps-32-32.png',
  },
  {
    id: 5,
    name: '食品',
    icon: 'https://img.alicdn.com/imgextra/i1/O1CN01Jkawfq269YIK0Ailv_!!6000000007619-2-tps-32-32.png',
  },
  {
    id: 6,
    name: '美妆',
    icon: 'https://img.alicdn.com/imgextra/i4/O1CN012MUS421KHhmrrelaZ_!!6000000001139-2-tps-32-32.png',
  },
  {
    id: 7,
    name: '玩具',
    icon: 'https://img.alicdn.com/imgextra/i4/O1CN017TlSvI1HnMJVDjOSO_!!6000000000802-2-tps-30-32.png',
  },
  {
    id: 8,
    name: '运动',
    icon: 'https://img.alicdn.com/imgextra/i4/O1CN01ujzEOe1LsdKxeJYUM_!!6000000001355-2-tps-32-30.png',
  },
  {
    id: 9,
    name: '图书',
    icon: 'https://img.alicdn.com/imgextra/i2/O1CN01kYIKhS29pdXDMQf2T_!!6000000008117-2-tps-32-32.png',
  },
  {
    id: 10,
    name: '其他',
    icon: 'https://img.alicdn.com/imgextra/i2/O1CN01xmEMQy1azFI9B4d2M_!!6000000003400-2-tps-32-26.png',
  },
]

const GoodsCategoriesList = ({ limit = 8 }: { limit?: number }) => {
  return (
    <View className="px-3 flex-1">
      <FlashList
        data={goodsCategories.slice(0, limit)}
        numColumns={4}
        estimatedItemSize={96}
        renderItem={({ item }) => (
          <View
            className="items-center justify-center w-full px-1 my-1"
            key={item.id}
          >
            <View className="bg-white h-[80px] rounded-xl shadow-sm shadow-slate-400 w-full items-center justify-center space-y-1">
              <Image
                source={{ uri: item.icon }}
                className="w-6 h-6"
                resizeMode="contain"
              />
              <Text className="text-center text-sm">{item.name}</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const GoodsListHeader = () => {
  const campusList = [
    {
      id: 1,
      name: '宣城',
      img: 'https://www.hfut.edu.cn/__local/2/25/BA/7FA4000B62199F34C20447925CE_ACC8019A_1CB89.jpg',
    },
    {
      id: 2,
      name: '翡翠湖',
      img: 'https://www.hfut.edu.cn/__local/B/FA/01/F77000BC061104139926540683E_EDA200B6_BFFA.jpg',
    },
    {
      id: 3,
      name: '屯溪路',
      img: 'https://www.hfut.edu.cn/__local/8/5B/FC/0653252EDB9250398B11A620B6F_3CA66AE0_18F22.jpg',
    },
  ]
  return (
    <>
      <View>
        <GoodsCategoriesList />
        {/* 三个校区 */}
        <View className="flex-row justify-between items-center px-4 py-4 space-x-2 flex-1">
          {campusList.map((item) => (
            <View
              key={item.id}
              className="flex-1 bg-white p-2 rounded-xl flex-1 shadow-sm shadow-slate-400"
            >
              <View className="flex-1 justify-center items-center">
                <Image
                  source={{ uri: item.img }}
                  className="w-[96px] h-[96px] rounded-xl"
                />
              </View>
              <View className="my-2">
                <Text className="text-center text-sm">{item.name}校区</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  )
}

const MarketGoodsFlashList = memo((props: any) => (
  <FlashList
    {...props}
    ListHeaderComponent={GoodsListHeader}
    numColumns={2}
    estimatedItemSize={202}
    style={[]}
  />
))

export const MarketScreen = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { dirtyFields },
  } = useForm({})

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false)

  const categoryIcon = `
  	<svg width="24" height="24"  fill="#8C8C8C" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8C8C8C" class="size-6">
  		<path stroke-linecap="round" stroke-linejoin="round" 
			d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
	</svg>`

  const marketGoodsListQuery = useMarketGoodsList()

  return (
    <LoadingScreen isLoading={false}>
      <View className="flex-1 space-y-1 bg-[#F7F7F7]">
        {/* 搜索及所有栏目 */}
        <View className="flex-row justify-between items-center px-4 py-4 space-x-3">
          <View className="flex-1">
            <Controller
              name={'keywords'}
              control={control}
              render={({ field }) => (
                <>
                  <TextInput
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    value={field.value}
                    mode="outlined"
                    dense={true}
                    placeholder="点击搜索"
                    outlineColor="transparent"
                    activeOutlineColor="#878787"
                    // 圆角
                    outlineStyle={{
                      borderRadius: 50,
                      borderWidth: 2,
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </>
              )}
            />
          </View>
          <View className="">
            <TouchableOpacity
              className="flex-row items-center justify-center bg-[#FFFFFF] rounded-xl w-[48px] h-[48px]"
              onPress={() => setBottomSheetVisible(true)}
            >
              <SvgXml xml={categoryIcon} className="w-[24px] h-[24px]" />
            </TouchableOpacity>
          </View>
        </View>
        <RefreshableGoodsList
          FlatListComponent={MarketGoodsFlashList}
          renderItem={({ item, index }) => (
            <GoodsItemCard item={item as any} index={index} />
          )}
          {...marketGoodsListQuery}
        />
      </View>
      {/* 显示所有类别 */}
      <BottomSheet
        snapPoints={['50%', '90%']}
        enablePanDownToClose={true}
        index={bottomSheetVisible ? 0 : -1}
        onChange={(index) => {
          if (index === -1) {
            setBottomSheetVisible(false)
          }
        }}
        handleComponent={() => (
          <View className="flex-row justify-center items-center h-12 bg-white rounded-t-3xl">
            <Text className="text-lg font-bold">所有类别</Text>
          </View>
        )}
      >
        <View className="bg-white rounded-t-3xl flex-1">
          <GoodsCategoriesList limit={goodsCategories.length} />
        </View>
      </BottomSheet>
    </LoadingScreen>
  )
}
