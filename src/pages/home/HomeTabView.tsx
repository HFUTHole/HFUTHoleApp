import React, { useEffect, useRef, useState } from 'react'
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
} from 'react-native-tab-view'
import { View } from 'native-base'
import {
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  Animated as ReactNativeAnimated,
  Text,
} from 'react-native'
import { PostList } from '@/pages/home/component/PostList'
import { FollowedPostList } from '@/pages/home/FollowedPostList'
import { MyAvatar } from '@/components/UserAvatar'
import { useHoleSearchRoute } from '@/shared/hooks/route/useHoleSearchRoute'
import { MarketScreen } from '../market/MarketScreen'
import { SearchIcon } from '@/components/icon'
import { DefaultTabBar, TabView } from '@/components/TabView'

export interface HomeTabViewProps {}

export const HomeTabView: React.FC<HomeTabViewProps> = () => {
  const { goIndex } = useHoleSearchRoute()

  return (
    <TabView
      defaultIndex={1}
      tabs={[
        { key: 'follow', title: '关注', component: FollowedPostList },
        { key: 'latest', title: '最新', component: PostList },
        { key: 'market', title: '淘二手', component: MarketScreen },
      ]}
      renderTabBar={(props) => {
        return (
          <View
            className={'flex-row space-x-4 items-center bg-white px-[2.5vw]'}
          >
            <MyAvatar />
            <View className={'flex-1'}>
              <DefaultTabBar {...props} />
            </View>
            <Pressable
              className={'rounded-full px-3 flex-row items-center '}
              onPress={() => {
                goIndex()
              }}
            >
              <View className="min-w-[24px]">
                <SearchIcon color={'#939496'} size={24} />
              </View>
            </Pressable>
          </View>
        )
      }}
    />
  )
}
