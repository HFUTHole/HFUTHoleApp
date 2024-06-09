import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { CarouselAction } from '@/pages/market/components/CarouselAction'
import { GoodsCampusList } from '@/pages/market/components/constant'

import { GoodsHomeHeaderSearch } from '@/pages/market/components/HeaderSearch'
import { AppDenoIcon } from '@/components/svg/SvgIcons'
import { SvgXml } from 'react-native-svg'

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
]

export const GoodsHomeHeader: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <GoodsHomeHeaderSearch />

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
                  <SvgXml xml={item.icon} className={'w-6 h-6'} />
                  <Text className="text-xs">{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>

      <View className="flex-row justify-between items-center px-4 py-2 space-x-2 flex-1">
        {GoodsCampusList.map((item) => (
          <TouchableOpacity
            className="bg-white p-2 rounded-xl flex-1 shadow-sm"
            onPress={() => {}}
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
