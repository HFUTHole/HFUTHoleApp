import React from 'react'
import { View } from 'native-base'
import { MyAvatar } from '@/components/UserAvatar'
import { Pressable, Text, TouchableOpacity } from 'react-native'
import { SearchIcon } from '@/components/icon'
import { useHoleSearchRoute } from '@/shared/hooks/route/useHoleSearchRoute'
import { Image } from 'expo-image'

export const HomeHeader: React.FC = () => {
  const { goIndex } = useHoleSearchRoute()
  return (
    <>
      <View
        className={'w-full flex-row justify-between items-center space-x-2'}
      >
        <TouchableOpacity onPress={() => {}}>
          <MyAvatar size={35} />
        </TouchableOpacity>
        <Pressable
          className={'h-full rounded-full px-3 flex-row items-center'}
          onPress={() => {
            goIndex()
          }}
        >
            <SearchIcon color={'#939496'} size={24} />
          {/* <View className={'flex-row items-center flex-1 '}>
            <Text className={'text-[#939496]'}>搜索...</Text>
          </View> */}
        </Pressable>
      </View>
    </>
  )
}
