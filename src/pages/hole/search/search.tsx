import { Page } from '@/components/Page'
import { HoleSearchHistory } from '@/pages/hole/search/history'
import { HoleSearchHeader } from '@/pages/hole/search/header'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'

export function HoleSearch() {
  return (
    <SafeAreaView className={'flex-1 bg-white'}>
      <HoleSearchHeader />
      <View className={'px-[2.5vw]'}>
        <HoleSearchHistory />
      </View>
    </SafeAreaView>
  )
}
