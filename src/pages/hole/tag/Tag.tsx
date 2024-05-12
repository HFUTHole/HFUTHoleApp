import { View, ScrollView, Pressable } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { StarIcon } from '@/components/icon'
import { useMemo, useState } from 'react'
import { TabView } from '@/components/TabView'
import { useRoute } from '@react-navigation/native'
import clsx from 'clsx'
import {
  TagHoleInfo,
  type TagHoleInfoData,
} from '@/pages/hole/components/TagHoleInfo'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'
import { useTagDetailSwr, useTagPostList } from '@/swr/hole/tag'
import { LoadingScreen } from '@/components/LoadingScreen'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { useParams } from '@/shared/hooks/useParams'
import { useTagParams } from '@/pages/hole/tag/useTagParams'

function PostHeader() {
  const { tag } = useTagParams()

  const { data, isLoading } = useTagDetailSwr(tag)

  return (
    <>
      <View className="px-4 py-4">
        <Text variant="headlineSmall">{`# ${tag}`}</Text>
        <View className="flex justify-between items-center flex-row">
          <Text>{`${data?.views}浏览`}</Text>
        </View>
      </View>
      <View className="h-[1px] bg-gray-400/40 mb-2"></View>
    </>
  )
}

export function TagScreen() {
  const { tag } = useTagParams()

  const query = useTagPostList(tag)

  return (
    <LoadingScreen isLoading={query.isLoading}>
      <SafeAreaView className="flex-1 w-full bg-white">
        <BackHeader title={'话题'} />

        <ScrollView>
          <PostHeader />
          <RefreshableHoleList
            {...query}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 5,
            }}
            renderItem={({ item: data }) => {
              const item = data as unknown as IHole

              return (
                <View className={'w-[47vw]'}>
                  <TagHoleInfo data={data} />
                </View>
              )
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </LoadingScreen>
  )
}
