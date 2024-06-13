import React, { useState } from 'react'
import { useBoolean } from 'ahooks'
import { SchoolAreaEnum } from '@/shared/enums/school-area.enum'
import { useUsedGoodsAreaParams } from '@/shared/hooks/route/useUsedGoodsRoute'
import { useUsedGoodsAreaQuery } from '@/swr/market/category'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'
import { Text, TouchableOpacity, View } from 'react-native'
import { LoadingScreen } from '@/components/LoadingScreen'
import { UsedGoodsColumnList } from '@/pages/market/components/UsedGoodsColumnList'

export const UsedGoodsAreaListScreen: React.FC = () => {
  const params = useUsedGoodsAreaParams()
  const query = useUsedGoodsAreaQuery()

  return (
    <SafeAreaView className={'flex-1 bg-white'}>
      <BackHeader title={params.area} />
      <LoadingScreen isLoading={query.isLoading}>
        <View className={'flex-1 bg-[#efefef]'}>
          <UsedGoodsColumnList {...query} />
        </View>
      </LoadingScreen>
    </SafeAreaView>
  )
}
