import React from 'react'
import { Text, View } from 'react-native'
import { HomeHeader } from '@/pages/home/component/HomeHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PostList } from '@/pages/home/component/PostList'
import { HomeTabView } from '@/pages/home/HomeTabView'

export const RecommendPost: React.FC = () => {
  return (
    <SafeAreaView className={'bg-white flex-1'}>
      <View className={'px-4'}>
        <HomeHeader />
      </View>
      <View className={'bg-background flex-1'}>
        <HomeTabView />
      </View>
    </SafeAreaView>
  )
}
