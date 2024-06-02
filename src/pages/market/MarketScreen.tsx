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
import { useState } from 'react'

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

const itemsData = {
  data: {
    items: [
      {
        id: 'c1f9e910-d608-4fd4-b6db-acb0597bddc8',
        createAt: '2024-06-02T04:36:06.767Z',
        body: '出一个iPad 2024最新版',
        price: 9999,
        area: '宣城',
        status: 0,
        imgs: [
          'http://sns-webpic-qc.xhscdn.com/202406022035/4e895de6be26da24c6e15482871e7028/1040g008313bam29pg4005njv44h08a0npiumoio!nd_dft_wlteh_webp_3',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
      {
        id: '3d73e80b-a542-45d8-8447-290148b5a761',
        createAt: '2024-06-02T04:33:29.026Z',
        body: '出一个超级可爱的书包',
        price: 245,
        area: '宣城',
        status: 0,
        imgs: [
          'https://sns-webpic-qc.xhscdn.com/202406022031/7ee23ab8a05a272bec5f43bd774cdfc4/1040g2sg311hcodromq005okato48dd0gslh62k0!nc_n_webp_mw_1',
          'https://sns-webpic-qc.xhscdn.com/202406022031/55d221b558e8bdf95f9fa71c220af49c/1040g2sg311hcodromq0g5okato48dd0gt5vacqg!nd_dft_wlteh_webp_3',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
      {
        id: '99c24868-9309-4c9a-a937-e671fabf8902',
        createAt: '2024-06-02T04:30:40.506Z',
        body: '出一张4090',
        price: 9999,
        area: '翡翠湖',
        status: 0,
        imgs: [
          'https://sns-webpic-qc.xhscdn.com/202406022029/8d7b23cacf63b300a156577c3ac378eb/1040g008312he8mu770005nqng0vg88n5k21a09o!nc_n_webp_mw_1',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
      {
        id: '53256ccc-6b74-49f4-9134-7871921cd009',
        createAt: '2024-06-02T04:30:34.544Z',
        body: '出一张4090',
        price: 1.22,
        area: '翡翠湖',
        status: 0,
        imgs: [
          'https://sns-webpic-qc.xhscdn.com/202406022029/8d7b23cacf63b300a156577c3ac378eb/1040g008312he8mu770005nqng0vg88n5k21a09o!nc_n_webp_mw_1',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
      {
        id: '385d4a18-f227-4c4f-8b33-e17f3b813bb6',
        createAt: '2024-06-02T04:29:38.657Z',
        body: '石膏娃娃～库洛米，石膏娃娃涂鸦，存钱罐，治愈又解压。受欢迎的库洛米，也太好看了吧～',
        price: 1.22,
        area: '屯溪路',
        status: 0,
        imgs: [
          'https://sns-webpic-qc.xhscdn.com/202406022029/6be74878c7a7f7c95fdb2a99bfdaec73/1000g00824bd9g5afq0005ojnajpocg829t0ofl8!nc_n_webp_mw_1',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
      {
        id: '2051ecea-4226-4730-b650-f949ad70f790',
        createAt: '2024-06-02T04:28:30.221Z',
        body: '卖一个我最喜欢的小熊熊',
        price: 1.22,
        area: '屯溪路',
        status: 0,
        imgs: [
          'https://sns-webpic-qc.xhscdn.com/202406022027/feed2f53990553b6c6d19c1864cb3e33/1000g0082hi95a3kj40605n6djfk4e5bp2to3qro!nc_n_webp_mw_1',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
      {
        id: 'a30c7e84-3373-4ec9-a719-3fc2aa70c85f',
        createAt: '2024-06-02T04:24:35.213Z',
        body: '一个迷你相机！！！',
        price: 1.22,
        area: '宣城',
        status: 0,
        imgs: [
          'https://sns-webpic-qc.xhscdn.com/202406022023/306ab6f185b32910b9695194fe302c5f/1040g008311p77n6n7c6g4b8g8j64cabem38bisg!nc_n_webp_mw_1',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
    ],
    meta: {
      totalItems: 7,
      itemCount: 7,
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1,
    },
  },
  msg: '获取成功',
  code: 200,
}

// 商品项目
interface GoodsItem {
  id: string
  createAt: string
  body: string
  price: number
  area: string
  status: number
  imgs: string[]
  creator: {
    id: number
    createAt: string
    username: string
    role: string
    avatar: string
  }
}

const GoodsCategoriesList = ({ limit = 8 }: { limit?: number }) => {
  return (
    <View className="px-1 flex-1">
      <FlashList
        data={goodsCategories.slice(0, limit)}
        numColumns={4}
        estimatedItemSize={96}
        renderItem={({ item }) => (
          <View
            className="items-center justify-center w-full px-2 my-2"
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

const GoodsItemCard: React.FC<{ item: GoodsItem; index: number }> = ({
  item,
  index,
}) => {
  const locationIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#8C8C8C" className="size-6">
	<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
	<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
  `

  return (
    <View
      className={clsx(
        'bg-white p-2 rounded-xl flex-1 my-2 shadow-sm shadow-slate-400',
        index % 2 === 0 ? 'ml-3 mr-2' : 'ml-2 mr-3',
      )}
    >
      <View className="flex-1">
        <Image
          source={{ uri: item.imgs[0] }}
          className=" w-full h-[160px] mr-2 rounded-xl"
        />
      </View>
      <View className="my-2">
        <Text className="font-bold" numberOfLines={1}>
          {item.body}
        </Text>
      </View>

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="flex-row items-center space-x-2">
            <Text className="text-sm text-gray-600">
              来自 {item.creator.username}
            </Text>
            {/* <UserAvatar
              url={item.creator.avatar}
              // userId={item.creator.id}
              size={24}
            /> */}
          </View>
        </View>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <View>
          <Text className="text-sky-500 font-bold">¥{item.price}</Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <SvgXml xml={locationIcon} className="w-4 h-4" />
          <Text>{item.area}</Text>
        </View>
      </View>
    </View>
  )
}

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
        <FlashList
          data={itemsData.data.items}
          ListHeaderComponent={GoodsListHeader}
          numColumns={2}
          estimatedItemSize={202}
          renderItem={({ item, index }) => (
            <GoodsItemCard item={item} index={index} />
          )}
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
