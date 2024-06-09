import { View, TouchableOpacity, Image } from 'react-native'
import { Text } from 'react-native-paper'
import { SvgXml } from 'react-native-svg'
import clsx from 'clsx'
import { UserAvatar } from '@/components/UserAvatar'
import React from 'react'

// 商品项目
export interface GoodsItem {
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

export const GoodsItemCard: React.FC<{ item: GoodsItem; index: number }> = ({
  item,
  index,
}) => {
  const locationIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#8C8C8C" className="size-6">
	  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
	  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
	</svg>
	`

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={clsx(
        'bg-white rounded-xl overflow-hidden flex-1 my-1 shadow-sm mt-2',
        index % 2 === 0 ? 'ml-3 mr-2' : 'ml-2 mr-3',
      )}
    >
      <Image
        source={{
          uri: 'https://sns-webpic-qc.xhscdn.com/202406092139/a690cc957633c3a1ba5068807e1bdb38/1040g00830q4ip536ne005necnni08nu310h2p8g!nc_n_webp_mw_1',
        }}
        className="w-full h-52"
      />
      <View className={'p-2 space-y-2'}>
        <Text className="font-bold" numberOfLines={1} ellipsizeMode={'tail'}>
          {item.body}
        </Text>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="flex-row items-center space-x-2">
              <UserAvatar
                url={item.creator.avatar}
                userId={item.creator.id}
                size={20}
              />
              <Text className="text-sm text-gray-600">
                {item.creator.username}
              </Text>
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
    </TouchableOpacity>
  )
}

export const GoodsItemCardHorizontal: React.FC<{ item: GoodsItem }> = ({
  item,
}) => {
  const locationIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#8C8C8C" className="size-6">
	  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
	  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
	</svg>
	`

  return (
    <View
      className={
        'flex-row bg-white p-3 rounded-xl flex-1 mx-3 my-2 shadow-sm shadow-slate-400 space-x-2'
      }
    >
      <View>
        <Image
          source={{ uri: item.imgs[0] }}
          className=" h-[96px] w-[96px] mr-2 rounded-xl"
        />
        {/* mask */}
        {item.status === 1 && (
          <View className="absolute w-[96px] h-[96px] top-0 left-0 bg-[#bababa]/50 rounded-xl"></View>
        )}
      </View>
      <View
        className="flex-1 justify-between"
        style={{
          opacity: item.status === 1 ? 0.5 : 1,
        }}
      >
        <View className="mb-2">
          <Text className="font-bold" numberOfLines={1}>
            {item.body}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="flex-row items-center space-x-2">
              <View className="flex-row items-center space-x-1">
                <SvgXml xml={locationIcon} className="w-4 h-4" />
                <Text>{item.area}</Text>
              </View>
              <Text className="text-sm text-gray-600">
                {item.creator.username}
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
        </View>
      </View>
      {item.status === 1 && (
        <View className="absolute bottom-0 right-0 bg-[#8B8B8B] px-2 py-1 rounded-tl-xl rounded-br-xl">
          <Text className="text-white">已售出</Text>
        </View>
      )}
    </View>
  )
}
