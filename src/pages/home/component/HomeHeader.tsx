import React from 'react'
import { View } from 'native-base'
import { MyAvatar } from '@/components/UserAvatar'
import { Pressable, Text, TouchableOpacity } from 'react-native'
import { SearchIcon } from '@/components/icon'
import { useHoleSearchRoute } from '@/shared/hooks/route/useHoleSearchRoute'

export const HomeHeader: React.FC = () => {
  const { goIndex } = useHoleSearchRoute()
  return (
    <View className={'w-full flex-row justify-between items-center space-x-2'}>
      <TouchableOpacity onPress={() => {}}>
        <MyAvatar size={35} />
      </TouchableOpacity>
      <Pressable
        className={'bg-[#eeeef0] flex-1 h-8 rounded-full px-3'}
        onPress={() => {
          goIndex()
        }}
      >
        <View className={'flex-row items-center flex-1 '}>
          <SearchIcon color={'#939496'} size={20} />
          <Text className={'text-[#939496]'}>搜索...</Text>
        </View>
      </Pressable>
    </View>
  )
}
