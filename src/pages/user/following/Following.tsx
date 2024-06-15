import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'
import { useParams } from '@/shared/hooks/useParams'
import { useBaseQuery } from '@/swr/useBaseQuery'
import { Apis } from '@/request/apis'
import { DefaultTabBar, TabView } from '@/components/TabView'
import { UserFollowingType } from '@/request/apis/user'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { LoadingScreen } from '@/components/LoadingScreen'
import { FlatList, Text, View } from 'react-native'
import { Empty } from '@/components/image/Empty'
import { ProfileScreenTabBar } from '@/pages/user/profile/OtherUserProfile'
import { TouchableRipple } from 'react-native-paper'
import { UserAvatar } from '@/components/UserAvatar'
import { FollowButton } from '@/components/user/FollowButton'
import { InferArrayItem } from '@/shared/types'
import { FlashList } from '@shopify/flash-list'

const Item: React.FC<{
  data: InferArrayItem<IUserFollowingResponse['following']>
}> = (props) => {
  const { data } = props
  return (
    <TouchableRipple
      onPress={() => {}}
      className={'flex-1 w-full py-3 px-[2.5vw]'}
    >
      <View className={'flex-row justify-between items-center'}>
        <View className={'flex-row space-x-2 items-center'}>
          <UserAvatar size={50} url={data!.avatar} />
          <View className={''}>
            <Text className={'text-base'}>{data!.username}</Text>
            <Text className={'text-xs text-quaternary-label'}>
              {data?.desc || 'Ta还没有简介哦'}
            </Text>
          </View>
        </View>
        <FollowButton className={'rounded-md'} followingId={data.id} />
      </View>
    </TouchableRipple>
  )
}

const useUserFollowingParams = () => {
  return useParams<{
    userId: number
    showFollowing?: boolean
  }>()
}

const useUserFollowingQuery = (type: UserFollowingType = 'following') => {
  const { userId, showFollowing } = useUserFollowingParams()

  const query = useBaseQuery({
    queryKey: ['user.following', type, userId],
    queryFn: () => {
      return Apis.user.getUserFollowingRequest({
        userId,
        type,
      })
    },
  })

  return {
    ...query,
    showFollowing,
  }
}

const FollowingList = () => {
  const { data, ...query } = useUserFollowingQuery()

  return (
    <LoadingScreen isLoading={query.isLoading}>
      <View className={'flex-1 bg-white'}>
        <FlatList
          data={data?.following || []}
          ListEmptyComponent={<Empty text={'还没有关注哦~'} />}
          renderItem={({ item }) => {
            return <Item data={item} />
          }}
          {...query}
        />
      </View>
    </LoadingScreen>
  )
}

const FollowerList = () => {
  const { data, ...query } = useUserFollowingQuery('followers')

  return (
    <LoadingScreen isLoading={query.isLoading}>
      <View className={'flex-1 h-full'}>
        <FlashList
          data={data?.followers || []}
          ListEmptyComponent={<Empty text={'还没有关注哦~'} />}
          renderItem={({ item }) => {
            return <Item key={item.id} data={item} />
          }}
          {...query}
        />
      </View>
    </LoadingScreen>
  )
}

export const UserFollowingScreen: React.FC = () => {
  const { data, showFollowing } = useUserFollowingQuery()

  return (
    <SafeAreaView className={'flex-1 bg-white'}>
      <BackHeader title={data?.username || '关注页'} />
      <TabView
        defaultIndex={showFollowing ? 0 : 1}
        renderTabBar={(props) => {
          return (
            <View className={'px-[2.5vw] mb-2'}>
              <DefaultTabBar {...props} />
            </View>
          )
        }}
        tabs={[
          {
            key: 'followers',
            title: '关注',
            component: FollowingList,
          },
          {
            key: 'following',
            title: '粉丝',
            component: FollowerList,
          },
        ]}
      />
    </SafeAreaView>
  )
}
