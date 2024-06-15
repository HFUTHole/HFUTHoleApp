import React, { useMemo, useState } from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import {
  TabView as NativeTabView,
  SceneMap,
  type Route,
  type TabViewProps as NativeTabViewProps,
  TabBar,
} from 'react-native-tab-view'
import { useTheme } from 'react-native-paper'
import type { Props as RNTabViewProps } from 'react-native-tab-view/lib/typescript/src/TabBar'
import { ProfileScreenTabBar } from '@/pages/user/profile/OtherUserProfile'

export interface ITabViewTabs extends Route {
  // 这里 component 写成 ReactNode 会报错，好奇怪
  component?: any
}

interface TabViewProps extends Partial<NativeTabViewProps<Route>> {
  tabs: ITabViewTabs[]
  defaultIndex?: number
}

export const TabView = ({ tabs, defaultIndex = 0, ...props }: TabViewProps) => {
  const [index, setIndex] = useState(defaultIndex)

  const renderScene = useMemo(
    () =>
      SceneMap(Object.fromEntries(tabs.map((tab) => [tab.key, tab.component]))),
    [tabs],
  )

  return (
    <NativeTabView
      lazy={true}
      renderTabBar={ProfileScreenTabBar}
      navigationState={{ index, routes: tabs }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      {...props}
    />
  )
}

export function TabViewBar(props: RNTabViewProps<any>) {
  const theme = useTheme()

  return (
    <View className={'flex-1 bg-red-200'}>
      <Text>1111</Text>
    </View>
  )
}
