import React from 'react'
import { View } from 'native-base'
import { MyAvatar } from '@/components/UserAvatar'
import { Text, TouchableOpacity } from 'react-native'
import { SearchIcon } from '@/components/icon'

export const HomeHeader: React.FC = () => {
  return (
    <View className={'w-full flex-row justify-between items-center space-x-2'}>
      <TouchableOpacity onPress={() => {}}>
        <MyAvatar size={35} />
      </TouchableOpacity>
      <View
        className={
          'flex-row bg-[#eeeef0] flex-1 h-8 rounded-full items-center px-3'
        }
      >
        <SearchIcon color={'#939496'} size={20} />
        <Text className={'text-[#939496]'}>搜索...</Text>
      </View>
    </View>
  )
}
