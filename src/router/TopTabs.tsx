import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs'
import { SearchIcon } from '@/components/icon'
import { TopTabHeader } from '@/router/components/TabHeader'
import { useHoleSearchRoute } from '@/shared/hooks/route/useHoleSearchRoute'
import AppDenoSvg from '@/assets/svg/app_deno.svg'
import { Svg, SvgComponentType } from '@/components/svg/Svg'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'
import { HoleLatest } from '@/pages/hole/latest/HoleLatest'
import React from 'react'
import { HoleHot } from '@/pages/hole/hot/HoleHot'
import { HoleCategoryScreen } from '@/pages/hole/category/HoleCategoryScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RecommendPost } from '@/pages/home/RecommendPost'
import { View } from 'react-native'
import { HomeHeader } from '@/pages/home/component/HomeHeader'

const Tab = createMaterialTopTabNavigator()

type HoleTopTabItem = {
  name: string
  title: string
  component: React.FunctionComponent
  svg?: SvgComponentType
  options?: MaterialTopTabBarProps
}

const HoleTopTabs: HoleTopTabItem[] = [
  {
    name: 'home',
    title: '推荐',
    component: RecommendPost,
  },
]

const TopTabBar: React.FC<MaterialTopTabBarProps> = (props) => {
  const route = useHoleSearchRoute()

  return (
    <View>
      <HomeHeader />
      <TopTabHeader {...props} />
    </View>
  )
}

export function TopTabs() {
  return (
    <SafeAreaView className={'h-full bg-background'} edges={['top']}>
      <Tab.Navigator initialRouteName={'latest'} tabBar={TopTabBar}>
        {HoleTopTabs.map((item) => (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={
              {
                title: item.title,
                ...item.options,
                svg: item.svg,
              } as MaterialTopTabNavigationOptions & { svg: SvgComponentType }
            }
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  )
}
