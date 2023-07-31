import { BaseAppBar } from '@/components/BaseAppBar'
import React from 'react'
import { useHoleDetail } from '@/swr/hole'
import { HoleInfoHeader } from '@/pages/hole/components/HoleInfo'
import { Text, View } from 'react-native'
import { PrimaryText } from '@/components/Text/PrimaryText'
export function HoleDetailHeader() {
  const { data, isSuccess } = useHoleDetail()

  return (
    <>
      <BaseAppBar>
        {isSuccess && (
          <View className={'flex-1'}>
            <View className={'flex-row space-x-2 items-center'}>
              <Text className={'font-bold text-primary'}>#{data?.id}</Text>
              <View className={'flex-1'}>
                <HoleInfoHeader data={data!} />
              </View>
            </View>
          </View>
        )}
      </BaseAppBar>
    </>
  )
}
