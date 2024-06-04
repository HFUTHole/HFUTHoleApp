import { View, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, TextInput, TouchableRipple } from 'react-native-paper'
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
import { CarouselAction } from './components/CarouselAction'
import { useNavigation } from '@react-navigation/native'

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
            className="w-6 h-6"
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

const CollapsedGoodsCategoriesList = () => {
  return (
    <CarouselAction
      data={goodsCategories}
      height={72}
      renderItem={(item) => <GoodsCategoriesCard item={item} />}
    />
  )
}

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
const actions = [
  // 我的商品，我的收藏
  {
    id: 1,
    name: '我的商品',
    icon: `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1509" strokeWidth="1.5" stroke="#DF4C1C"><path d="M875.2 220.8L571.2 64c-36.8-19.2-81.6-19.2-118.4 0l-304 158.4c-41.6 19.2-68.8 64-68.8 112v356.8c0 48 27.2 91.2 68.8 113.6l305.6 158.4c17.6 9.6 38.4 14.4 59.2 14.4 20.8 0 40-4.8 59.2-14.4l302.4-156.8c43.2-22.4 68.8-65.6 68.8-113.6V334.4c0-48-27.2-92.8-68.8-113.6zM483.2 120c9.6-4.8 19.2-8 28.8-8 9.6 0 20.8 1.6 28.8 6.4l304 156.8c4.8 1.6 8 4.8 12.8 8L512 462.4l-345.6-176c3.2-3.2 8-6.4 12.8-8l304-158.4z m-304 627.2C156.8 736 144 713.6 144 689.6V345.6l128 65.6v144c0 12.8 6.4 24 17.6 28.8l22.4 11.2c1.6 1.6 4.8 1.6 6.4 1.6 9.6 0 16-6.4 16-16v-137.6l144 73.6v385.6l-299.2-155.2z m665.6 0L544 904V516.8l336-171.2v344c0 24-12.8 46.4-35.2 57.6z" fill="#DF4C1C" p-id="5289"></path></svg>`,
  },
  {
    id: 2,
    name: '我的收藏',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="#DF4C1C" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
  `,
    action: (navigation: any) => {
      navigation.navigate('market', {
        screen: 'market-favorite',
      })
    },
  },
  {
    id: 3,
    name: '购物消息',
    icon: `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1509" strokeWidth="1" stroke="#333"><path d="M821.333333 800H547.584l-86.464 96.074667a32 32 0 1 1-47.573333-42.816l96-106.666667A32 32 0 0 1 533.333333 736h288a53.333333 53.333333 0 0 0 53.333334-53.333333V234.666667a53.333333 53.333333 0 0 0-53.333334-53.333334H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333334v448a53.333333 53.333333 0 0 0 53.333334 53.333333h138.666666a32 32 0 0 1 0 64H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V234.666667c0-64.8 52.533333-117.333333 117.333334-117.333334h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333334v448c0 64.8-52.533333 117.333333-117.333334 117.333333zM704 341.333333a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h384zM512 512a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h192z" fill="#DF4C1C" p-id="3274"></path></svg>`,
  },
  {
    id: 4,
    name: '我的订单',
    icon: `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1509" strokeWidth="1.5" stroke="#333">
    <path d="M298.666667 341.333333h384v42.666667H298.666667v-42.666667z m0 128h298.666666v42.666667H298.666667v-42.666667z m0 128h298.666666v42.666667H298.666667v-42.666667z m0-469.376C298.666667 104.405333 317.824 85.333333 341.12 85.333333h341.76C706.304 85.333333 725.333333 104.490667 725.333333 127.957333v42.752A42.645333 42.645333 0 0 1 682.88 213.333333H341.12C317.696 213.333333 298.666667 194.176 298.666667 170.709333V127.957333zM170.666667 938.666667h682.666666c23.68 0 42.666667-19.157333 42.666667-42.773334V170.773333C896 147.093333 876.842667 128 853.205333 128h-63.296v42.666667h63.296c0.128 0.106667 0.170667 725.333333 0.128 725.333333H170.666667V170.773333C170.752 170.709333 236.16 170.666667 236.16 170.666667V128H170.752A42.752 42.752 0 0 0 128 170.773333v725.12A42.666667 42.666667 0 0 0 170.666667 938.666667z m170.666666-768h341.333334V128H341.333333v42.666667z" fill="#DF4C1C" p-id="1510"></path>
    </svg>`,
  },
  {
    id: 5,
    name: '购物消息',
    icon: `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1509" strokeWidth="1" stroke="#333"><path d="M821.333333 800H547.584l-86.464 96.074667a32 32 0 1 1-47.573333-42.816l96-106.666667A32 32 0 0 1 533.333333 736h288a53.333333 53.333333 0 0 0 53.333334-53.333333V234.666667a53.333333 53.333333 0 0 0-53.333334-53.333334H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333334v448a53.333333 53.333333 0 0 0 53.333334 53.333333h138.666666a32 32 0 0 1 0 64H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V234.666667c0-64.8 52.533333-117.333333 117.333334-117.333334h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333334v448c0 64.8-52.533333 117.333333-117.333334 117.333333zM704 341.333333a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h384zM512 512a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h192z" fill="#DF4C1C" p-id="3274"></path></svg>`,
  },
]

const GoodsListHeader = () => {
  const navigation = useNavigation()
  return (
    <View className="flex-1">
      <View className="flex-1 px-4 mb-4">
        <View className="bg-white rounded-md py-2">
          <CarouselAction
            data={actions}
            height={60}
            numOfColumns={5}
            renderItem={(item) => (
              <TouchableOpacity
                className="items-center justify-center bg-white rounded-xl w-[64px] py-2 space-y-1 w-full"
                onPress={() => {
                  item.action?.(navigation)
                }}
              >
                <SvgXml xml={item.icon} className="w-6 h-6" width={72}/>
                <Text className="text-xs">{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View className="flex-1 px-4 mb-2">
        <View className="bg-white rounded-md py-2">
          <CollapsedGoodsCategoriesList />
        </View>
      </View>

      {/* 三个校区 */}
      <View className="flex-row justify-between items-center px-4 py-2 space-x-2 flex-1">
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
  )
}

const MarketGoodsFlashList = memo((props: any) => (
  <FlashList
    {...props}
    ListHeaderComponent={GoodsListHeader}
    ListHeaderComponentStyle={{ flex: 1 }}
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
        {/* <View className="flex-row justify-between items-center px-4 py-4 space-x-2 flex-1">
          <CarouselAction data={[1,2,3,4]}/>
        </View> */}
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
          <GoodsCategoriesList />
        </View>
      </BottomSheet>
    </LoadingScreen>
  )
}
