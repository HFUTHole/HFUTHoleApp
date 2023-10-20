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
import { EmojiCard } from '@/components/emoji/EmojiCard/EmojiCard'
import { PopoverCard } from '@/components/PopoverCard/PopoverCard'

const Tab = createMaterialTopTabNavigator()

interface TopTabBarIconProps {
  focused: boolean
  color: string
  svg: SvgComponentType
  categoryColor: string
}

export function TopTabBarIcon(props: TopTabBarIconProps) {
  const { focused, color, svg, categoryColor } = props

  return (
    <>
      {focused && (
        <Animated.View
          entering={ZoomIn.springify().damping(30)}
          exiting={ZoomOut.duration(200)}
        >
          <Svg SvgComponent={svg} size={30} color={categoryColor} />
        </Animated.View>
      )}
    </>
  )
}

type HoleTopTabItem = {
  name: string
  title: string
  component: React.FunctionComponent
  svg?: SvgComponentType
  options?: MaterialTopTabBarProps
}

const HoleTopTabs: HoleTopTabItem[] = [
  {
    name: 'latest',
    component: HoleLatest,
    title: '主页',
    svg: AppDenoSvg,
  },
  {
    name: 'hot',
    component: HoleHot,
    title: '热门',
  },
  {
    name: 'category',
    component: HoleCategoryScreen,
    title: '板块',
  },
]

const TopTabBar: React.FC<MaterialTopTabBarProps> = (props) => {
  const route = useHoleSearchRoute()

  return (
    <TopTabHeader {...props} onRightPress={route.goIndex}>
      <SearchIcon />
    </TopTabHeader>
  )
}

export function TopTabs() {
  return (
    <>
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
    </>
  )
}
