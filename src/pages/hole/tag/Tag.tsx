import { View, ScrollView, Pressable, Text } from 'react-native'
import { StarIcon } from '@/components/icon'
import { memo, useMemo, useState } from 'react'
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
import { If, Then } from 'react-if'
import { MasonryFlashList, MasonryFlashListProps } from '@shopify/flash-list'

function PostHeader() {
  const { tag } = useTagParams()

  const { data, isLoading } = useTagDetailSwr(tag)

  return (
    <>
      <View className="px-4 py-4">
        <Text className={'text-lg text-primary-label'}># {data?.body}</Text>
        <View className="flex pt-4">
          <Text
            className={'text-sm text-tertiary-label'}
          >{`${data?.views}浏览`}</Text>
          <If condition={data?.desc}>
            <Then>
              <Text className={'text-sm text-tertiary-label mt-2'}>
                【官方话题】{data?.desc}
              </Text>
            </Then>
          </If>
        </View>
      </View>
      <View className="h-[1px] bg-gray-400/40 mb-2"></View>
    </>
  )
}

const TagMasonryFlashList = memo(
  <T,>(props: MasonryFlashListProps<T> & { data: TagHoleInfoData[] }) => {
    return (
      <MasonryFlashList
        numColumns={2}
        estimatedItemSize={255}
        {...props}
        data={props.data}
      />
    )
  },
)

export function TagScreen() {
  const { tag } = useTagParams()

  const query = useTagPostList(tag)

  return (
    <LoadingScreen isLoading={query.isLoading}>
      <SafeAreaView className="flex-1 w-full bg-white">
        <BackHeader title={'话题'} />
        <RefreshableHoleList
          {...query}
          ListHeaderComponent={
            <View className={'w-screen'}>
              <PostHeader />
            </View>
          }
          FlatListComponent={TagMasonryFlashList}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 5,
          }}
          renderItem={({ item: data }) => {
            return (
              <View className={'w-[48vw] mx-auto my-[5px]'}>
                <TagHoleInfo data={data} />
              </View>
            )
          }}
        />
      </SafeAreaView>
    </LoadingScreen>
  )
}
